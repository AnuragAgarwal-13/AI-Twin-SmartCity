from sqlalchemy.orm import Session
from sqlalchemy import func
from backend.models import TransportationData


# ============================
# Get all traffic records
# ============================
def get_all_traffic(db: Session):
    return db.query(TransportationData).all()


# ============================
# Get one traffic record
# ============================
def get_traffic_by_id(db: Session, record_id: int):
    return db.query(TransportationData).filter(
        TransportationData.Record_ID == record_id
    ).first()


# ============================
# Get total records
# ============================
def get_total_records(db: Session):
    return db.query(TransportationData).count()


# ============================
# Dashboard Summary
# ============================
def get_dashboard_summary(db: Session):

    total_records = db.query(TransportationData).count()

    total_vehicles = db.query(
        func.sum(TransportationData.Vehicle_Count)
    ).scalar()

    average_speed = db.query(
        func.avg(TransportationData.Avg_Speed)
    ).scalar()

    total_accidents = db.query(
        TransportationData
    ).filter(
        TransportationData.Accident == "Yes"
    ).count()

    return {
        "total_records": total_records,
        "total_vehicles": total_vehicles,
        "average_speed": round(average_speed, 2),
        "total_accidents": total_accidents
    }


# ============================
# Search by Weather
# ============================
def get_traffic_by_weather(db: Session, weather: str):
    return db.query(TransportationData).filter(
        func.lower(TransportationData.Weather) == weather.lower()
    ).all()


# ============================
# Search by Density
# ============================
def get_traffic_by_density(db: Session, density: str):
    return db.query(TransportationData).filter(
        func.lower(TransportationData.Traffic_Density) == density.lower()
    ).all()


# ============================
# Search by Road ID
# ============================
def get_traffic_by_road(db: Session, road_id: str):
    return (
        db.query(TransportationData)
        .filter(
            TransportationData.Road_ID.ilike(f"%{road_id}%")
        )
        .all()
    )


# ======================================================
# NEW COMBINED FILTER (Road + Weather + Density)
# ======================================================
def filter_traffic(
    db: Session,
    road_id: str = None,
    weather: str = None,
    density: str = None
):

    query = db.query(TransportationData)

    if road_id:
        query = query.filter(
            TransportationData.Road_ID.ilike(f"%{road_id}%")
        )

    if weather:
        query = query.filter(
            func.lower(TransportationData.Weather)
            == weather.lower()
        )

    if density:
        query = query.filter(
            func.lower(TransportationData.Traffic_Density)
            == density.lower()
        )

    return query.all()


# ============================
# Weather Statistics
# ============================
def get_weather_statistics(db: Session):

    results = (
        db.query(
            TransportationData.Weather,
            func.count(TransportationData.Weather)
        )
        .group_by(TransportationData.Weather)
        .all()
    )

    return {
        weather: count
        for weather, count in results
    }


# ============================
# Vehicle Statistics
# ============================
def get_vehicle_statistics(db: Session):

    results = (
        db.query(
            TransportationData.Vehicle_Type,
            func.count(TransportationData.Vehicle_Type)
        )
        .group_by(TransportationData.Vehicle_Type)
        .all()
    )

    return {
        vehicle: count
        for vehicle, count in results
    }


# ============================
# Road Condition Statistics
# ============================
def get_road_condition_stats(db: Session):

    result = (
        db.query(
            TransportationData.Road_Condition,
            func.count().label("count")
        )
        .group_by(TransportationData.Road_Condition)
        .all()
    )

    return {
        row.Road_Condition: row.count
        for row in result
    }


# ============================
# Accident Statistics
# ============================
def get_accident_stats(db: Session):

    result = (
        db.query(
            TransportationData.Accident,
            func.count().label("count")
        )
        .group_by(TransportationData.Accident)
        .all()
    )

    return {
        row.Accident: row.count
        for row in result
    }


# ============================
# Average Speed by Weather
# ============================
def get_average_speed_by_weather(db: Session):

    result = (
        db.query(
            TransportationData.Weather,
            func.avg(
                TransportationData.Avg_Speed
            ).label("avg_speed")
        )
        .group_by(
            TransportationData.Weather
        )
        .all()
    )

    return {
        row.Weather: round(row.avg_speed, 2)
        for row in result
    }


# ============================
# Vehicle Count by Road
# ============================
def get_vehicle_count_by_road(db: Session):

    result = (
        db.query(
            TransportationData.Road_ID,
            func.sum(
                TransportationData.Vehicle_Count
            ).label("total")
        )
        .group_by(
            TransportationData.Road_ID
        )
        .all()
    )

    return {
        row.Road_ID: row.total
        for row in result
    }


# ============================
# High Risk Roads
# ============================
def get_high_risk_roads(db: Session):

    result = (
        db.query(
            TransportationData.Road_ID,
            func.count().label("accidents")
        )
        .filter(
            TransportationData.Accident == "Yes"
        )
        .group_by(
            TransportationData.Road_ID
        )
        .order_by(
            func.count().desc()
        )
        .limit(10)
        .all()
    )

    return [
        {
            "Road_ID": row.Road_ID,
            "Accidents": row.accidents
        }
        for row in result
    ]

# ======================================================
# WEATHER MODULE
# ======================================================

# ============================
# Weather Summary
# ============================
def get_weather_summary(db: Session):

    average_temperature = db.query(
        func.avg(TransportationData.temperature)
    ).scalar()

    average_humidity = db.query(
        func.avg(TransportationData.humidity)
    ).scalar()

    average_visibility = db.query(
        func.avg(TransportationData.Visibility)
    ).scalar()

    return {
        "average_temperature": round(average_temperature or 0, 2),
        "average_humidity": round(average_humidity or 0, 2),
        "average_visibility": round(average_visibility or 0, 2)
    }


# ============================
# Weather Filter
# ============================
def filter_weather(
    db: Session,
    weather: str = None,
    temperature: str = None,
    humidity: str = None
):

    query = db.query(TransportationData)

    # ----------------------------
    # Filter by Weather
    # ----------------------------
    if weather:
        query = query.filter(
            func.lower(TransportationData.Weather) == weather.lower()
        )

    # ----------------------------
    # Filter by Temperature Range
    # ----------------------------
    if temperature:

       

        if temperature == "11-20":
            query = query.filter(
                TransportationData.temperature >= 11,
                TransportationData.temperature <= 20
            )

        elif temperature == "21-30":
            query = query.filter(
                TransportationData.temperature >= 21,
                TransportationData.temperature <= 30
            )

        elif temperature == "31-40":
            query = query.filter(
                TransportationData.temperature >= 31,
                TransportationData.temperature <= 40
            )

        elif temperature == "40+":
            query = query.filter(
                TransportationData.temperature >= 40
            )

    # ----------------------------
    # Filter by Humidity Range
    # ----------------------------
    if humidity:

        if humidity == "0-25":
            query = query.filter(
                TransportationData.humidity >= 0,
                TransportationData.humidity <= 25
            )

        elif humidity == "26-50":
            query = query.filter(
                TransportationData.humidity >= 26,
                TransportationData.humidity <= 50
            )

        elif humidity == "51-75":
            query = query.filter(
                TransportationData.humidity >= 51,
                TransportationData.humidity <= 75
            )

        elif humidity == "76-100":
            query = query.filter(
                TransportationData.humidity >= 76,
                TransportationData.humidity <= 100
            )

    return query.all()