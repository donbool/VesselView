from main import SessionLocal, Ship

db = SessionLocal()

ships = [
    {"id": 1, "name": "Vessel A", "speed": 12, "status": "On Course", "position_lat": 51.5, "position_lon": -0.1},
    {"id": 2, "name": "Vessel B", "speed": 10, "status": "Off Course", "position_lat": 51.6, "position_lon": -0.2},
    {"id": 3, "name": "Vessel C", "speed": 15, "status": "On Course", "position_lat": 51.7, "position_lon": -0.3},
]

for ship_data in ships:
    ship = Ship(**ship_data)
    db.add(ship)

db.commit()
db.close()
print("Database seeded!")
