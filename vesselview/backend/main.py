from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import Column, Integer, String, Float, Boolean, create_engine, func, ForeignKey, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel
from datetime import datetime, timedelta
import httpx
from typing import List

# Database setup
DATABASE_URL = "sqlite:///./ships.db"  # SQLite database file
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# FastAPI app setup
app = FastAPI()

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Database model (SQLAlchemy)
class Ship(Base):
    __tablename__ = "ships"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    speed = Column(Float)
    status = Column(String)
    position_lat = Column(Float)
    position_lon = Column(Float)
    starred = Column(Boolean, default=False)

# Pydantic models (request/response validation)
class ShipBase(BaseModel):
    name: str
    speed: float
    status: str
    position_lat: float
    position_lon: float
    starred: bool = False

class ShipCreate(ShipBase):
    pass

class ShipResponse(ShipBase):
    id: int

    class Config:
        orm_mode = True  # Allows Pydantic to work with SQLAlchemy objects

# Add these new models
class ShipPosition(Base):
    __tablename__ = "ship_positions"
    id = Column(Integer, primary_key=True, index=True)
    ship_id = Column(Integer, ForeignKey("ships.id"))
    timestamp = Column(DateTime, default=datetime.utcnow)
    position_lat = Column(Float)
    position_lon = Column(Float)
    speed = Column(Float)

# Create database tables
Base.metadata.create_all(bind=engine)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Routes
@app.get("/ships", response_model=list[ShipResponse])
def get_ships(db: Session = Depends(get_db)):
    try:
        ships = db.query(Ship).all()
        print(f"Found {len(ships)} ships in database")
        for ship in ships:
            print(f"Ship: {ship.name} at ({ship.position_lat}, {ship.position_lon})")
        return ships
    except Exception as e:
        print(f"Error fetching ships: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/ships", response_model=ShipResponse)
def add_ship(ship: ShipCreate, db: Session = Depends(get_db)):
    db_ship = Ship(
        name=ship.name,
        speed=ship.speed,
        status=ship.status,
        position_lat=ship.position_lat,
        position_lon=ship.position_lon,
        starred=ship.starred,
    )
    db.add(db_ship)
    db.commit()
    db.refresh(db_ship)
    return db_ship

@app.put("/ships/{ship_id}", response_model=ShipResponse)
def update_ship(ship_id: int, updated_ship: ShipCreate, db: Session = Depends(get_db)):
    ship = db.query(Ship).filter(Ship.id == ship_id).first()
    if not ship:
        raise HTTPException(status_code=404, detail="Ship not found")
    for key, value in updated_ship.dict().items():
        setattr(ship, key, value)
    db.commit()
    db.refresh(ship)
    return ship

@app.delete("/ships/{ship_id}")
def delete_ship(ship_id: int, db: Session = Depends(get_db)):
    ship = db.query(Ship).filter(Ship.id == ship_id).first()
    if not ship:
        raise HTTPException(status_code=404, detail="Ship not found")
    db.delete(ship)
    db.commit()
    return {"message": "Ship deleted successfully"}

@app.get("/statistics")
def get_statistics(db: Session = Depends(get_db)):
    try:
        total_ships = db.query(Ship).count()
        status_counts = db.query(Ship.status, func.count(Ship.id)).group_by(Ship.status).all()
        avg_speed = db.query(func.avg(Ship.speed)).scalar() or 0
        starred = db.query(Ship).filter(Ship.starred == True).count()

        print("Debug - Statistics:", {
            "total_ships": total_ships,
            "status_counts": status_counts,
            "avg_speed": avg_speed,
            "starred": starred
        })

        return {
            "total_ships": total_ships,
            "ships_by_status": [[str(status), int(count)] for status, count in status_counts],
            "average_speed": float(avg_speed),
            "starred_count": int(starred)
        }
    except Exception as e:
        print(f"Error in statistics endpoint: {str(e)}")  # Debug print
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/ships/{ship_id}/history")
def get_ship_history(ship_id: int, days: int = 7, db: Session = Depends(get_db)):
    ship = db.query(Ship).filter(Ship.id == ship_id).first()
    if not ship:
        raise HTTPException(status_code=404, detail="Ship not found")
    
    # For now, generate some fake historical positions
    history = []
    current_pos = [ship.position_lat, ship.position_lon]
    
    for i in range(days):
        history.append({
            "position_lat": current_pos[0] - (i * 0.1),
            "position_lon": current_pos[1] - (i * 0.1),
            "timestamp": datetime.utcnow() - timedelta(days=i),
            "speed": ship.speed
        })
    
    return history

@app.get("/ships/{ship_id}/weather")
async def get_ship_weather(ship_id: int, db: Session = Depends(get_db)):
    ship = db.query(Ship).filter(Ship.id == ship_id).first()
    if not ship:
        raise HTTPException(status_code=404, detail="Ship not found")
    
    # Return mock weather data for now
    return {
        "weather": [{"main": "Clear"}],
        "main": {
            "temp": 20.5
        }
    }
