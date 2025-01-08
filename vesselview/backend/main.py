from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import Column, Integer, String, Float, Boolean, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel

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
    allow_origins=["*"],  # Replace "*" with your frontend URL in production
    allow_methods=["*"],
    allow_headers=["*"],
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
    ships = db.query(Ship).all()
    return ships

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
