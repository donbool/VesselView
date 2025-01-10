from main import SessionLocal, Ship
import sys

def seed_database():
    try:
        db = SessionLocal()
        
        # Clear existing data
        print("Clearing existing ships...")
        db.query(Ship).delete()
        
        ships = [
            # Port of Rotterdam area
            {"name": "Rotterdam Trader", "speed": 12, "status": "At Port", "position_lat": 51.9225, "position_lon": 4.4792, "starred": False},
            # English Channel
            {"name": "Channel Express", "speed": 15, "status": "On Course", "position_lat": 50.5682, "position_lon": -0.9272, "starred": False},
            # Mediterranean - near Gibraltar
            {"name": "Gibraltar Star", "speed": 14, "status": "On Course", "position_lat": 36.1408, "position_lon": -5.3536, "starred": False},
            # Singapore Strait
            {"name": "Asia Pioneer", "speed": 13, "status": "On Course", "position_lat": 1.2655, "position_lon": 104.0244, "starred": False},
            # Suez Canal
            {"name": "Suez Voyager", "speed": 8, "status": "At Port", "position_lat": 30.9562, "position_lon": 32.5488, "starred": False},
        ]

        print(f"Adding {len(ships)} ships to database...")
        for ship_data in ships:
            ship = Ship(**ship_data)
            db.add(ship)
            print(f"Added ship: {ship_data['name']}")

        db.commit()
        
        # Verify the data was saved
        count = db.query(Ship).count()
        print(f"Database now contains {count} ships")
        
        all_ships = db.query(Ship).all()
        for ship in all_ships:
            print(f"Ship in DB: {ship.name} at position ({ship.position_lat}, {ship.position_lon})")
        
        db.close()
        print("Database seeded successfully!")
        
    except Exception as e:
        print(f"Error seeding database: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    seed_database()
