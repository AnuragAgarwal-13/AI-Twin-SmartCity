from sqlalchemy.orm import Session
from sqlalchemy import func

from backend.models import SmartCityData


# ============================================================
# COMMON
# ============================================================

def get_all_records(db: Session):
    return db.query(SmartCityData).all()


def get_record_by_id(db: Session, record_id: int):
    return (
        db.query(SmartCityData)
        .filter(SmartCityData.Record_ID == record_id)
        .first()
    )


def get_total_records(db: Session):
    return db.query(SmartCityData).count()


# ============================================================
# DASHBOARD SUMMARY
# ============================================================

def get_dashboard_summary(db: Session):

    total_records = db.query(SmartCityData).count()

    total_vehicles = (
        db.query(func.sum(SmartCityData.Vehicle_Count))
        .scalar()
        or 0
    )

    average_speed = (
        db.query(func.avg(SmartCityData.Avg_Speed))
        .scalar()
        or 0
    )

    total_accidents = (
        db.query(func.sum(SmartCityData.Incident_Count))
        .scalar()
        or 0
    )

    return {
        "total_records": total_records,
        "total_vehicles": int(total_vehicles),
        "average_speed": round(float(average_speed), 2),
        "total_accidents": int(total_accidents),
    }

# ============================================================
# TRAFFIC MODULE
# ============================================================

def get_all_traffic(db: Session):
    return db.query(SmartCityData).all()


def get_traffic_by_id(db: Session, record_id: int):
    return (
        db.query(SmartCityData)
        .filter(SmartCityData.Record_ID == record_id)
        .first()
    )


def get_traffic_by_weather(db: Session, weather: str):
    return (
        db.query(SmartCityData)
        .filter(
            func.lower(SmartCityData.Weather) == weather.lower()
        )
        .all()
    )


def get_traffic_by_density(db: Session, density: str):
    return (
        db.query(SmartCityData)
        .filter(
            func.lower(SmartCityData.Traffic_Density)
            == density.lower()
        )
        .all()
    )


def get_traffic_by_road(db: Session, road_id: str):
    return (
        db.query(SmartCityData)
        .filter(
            SmartCityData.Road_ID.ilike(f"%{road_id}%")
        )
        .all()
    )


def filter_traffic(
    db: Session,
    road_id: str = None,
    weather: str = None,
    density: str = None,
):
    query = db.query(SmartCityData)

    if road_id:
        query = query.filter(
            SmartCityData.Road_ID.ilike(f"%{road_id}%")
        )

    if weather:
        query = query.filter(
            func.lower(SmartCityData.Weather)
            == weather.lower()
        )

    if density:
        query = query.filter(
            func.lower(SmartCityData.Traffic_Density)
            == density.lower()
        )

    return query.all()


# ============================================================
# TRAFFIC STATISTICS
# ============================================================

def get_weather_statistics(db: Session):

    results = (
        db.query(
            SmartCityData.Weather,
            func.count(SmartCityData.Weather)
        )
        .group_by(SmartCityData.Weather)
        .all()
    )

    return {
        weather: count
        for weather, count in results
    }


def get_vehicle_statistics(db: Session):

    results = (
        db.query(
            SmartCityData.Vehicle_Type,
            func.count(SmartCityData.Vehicle_Type)
        )
        .group_by(SmartCityData.Vehicle_Type)
        .all()
    )

    return {
        vehicle: count
        for vehicle, count in results
    }


def get_road_condition_stats(db: Session):

    results = (
        db.query(
            SmartCityData.Road_Condition,
            func.count().label("count")
        )
        .group_by(SmartCityData.Road_Condition)
        .all()
    )

    return {
        row.Road_Condition: row.count
        for row in results
    }


def get_average_speed_by_weather(db: Session):

    results = (
        db.query(
            SmartCityData.Weather,
            func.avg(
                SmartCityData.Avg_Speed
            ).label("avg_speed")
        )
        .group_by(SmartCityData.Weather)
        .all()
    )

    return {
        row.Weather: round(float(row.avg_speed), 2)
        for row in results
    }


def get_vehicle_count_by_road(db: Session):

    results = (
        db.query(
            SmartCityData.Road_ID,
            func.sum(
                SmartCityData.Vehicle_Count
            ).label("total")
        )
        .group_by(SmartCityData.Road_ID)
        .all()
    )

    return {
        row.Road_ID: int(row.total or 0)
        for row in results
    }


def get_high_risk_roads(db: Session):

    results = (
        db.query(
            SmartCityData.Road_ID,
            func.sum(
                SmartCityData.Incident_Count
            ).label("incidents")
        )
        .group_by(SmartCityData.Road_ID)
        .order_by(
            func.sum(
                SmartCityData.Incident_Count
            ).desc()
        )
        .limit(10)
        .all()
    )

    return [
        {
            "Road_ID": row.Road_ID,
            "Incidents": int(row.incidents or 0),
        }
        for row in results
    ]


# ============================================================
# WEATHER MODULE
# ============================================================

def get_weather_summary(db: Session):

    average_temperature = (
        db.query(
            func.avg(SmartCityData.Temperature)
        )
        .scalar()
        or 0
    )

    average_humidity = (
        db.query(
            func.avg(SmartCityData.Humidity)
        )
        .scalar()
        or 0
    )

    average_visibility = (
        db.query(
            func.avg(SmartCityData.Visibility)
        )
        .scalar()
        or 0
    )

    return {
        "average_temperature": round(
            float(average_temperature), 2
        ),
        "average_humidity": round(
            float(average_humidity), 2
        ),
        "average_visibility": round(
            float(average_visibility), 2
        ),
    }


def filter_weather(
    db: Session,
    weather: str = None,
    temperature: str = None,
    humidity: str = None,
):

    query = db.query(SmartCityData)

    # ----------------------------
    # Weather
    # ----------------------------

    if weather:
        query = query.filter(
            func.lower(SmartCityData.Weather)
            == weather.lower()
        )

    # ----------------------------
    # Temperature
    # ----------------------------

    if temperature:

        if temperature == "10-20":
            query = query.filter(
                SmartCityData.Temperature >= 10,
                SmartCityData.Temperature < 20,
            )

        elif temperature == "20-30":
            query = query.filter(
                SmartCityData.Temperature >= 20,
                SmartCityData.Temperature < 30,
            )

        elif temperature == "30-40":
            query = query.filter(
                SmartCityData.Temperature >= 30,
                SmartCityData.Temperature < 40,
            )

        elif temperature == "40+":
            query = query.filter(
                SmartCityData.Temperature >= 40
            )

    # ----------------------------
    # Humidity
    # ----------------------------

    if humidity:

        if humidity == "0-25":
            query = query.filter(
                SmartCityData.Humidity >= 0,
                SmartCityData.Humidity <= 25,
            )

        elif humidity == "26-50":
            query = query.filter(
                SmartCityData.Humidity > 25,
                SmartCityData.Humidity <= 50,
            )

        elif humidity == "51-75":
            query = query.filter(
                SmartCityData.Humidity > 50,
                SmartCityData.Humidity <= 75,
            )

        elif humidity == "76-100":
            query = query.filter(
                SmartCityData.Humidity > 75,
                SmartCityData.Humidity <= 100,
            )

    return query.all()


# ============================================================
# AIR QUALITY MODULE
# ============================================================

def get_air_quality_summary(db: Session):

    average_aqi = (
        db.query(func.avg(SmartCityData.AQI))
        .scalar()
        or 0
    )

    average_pm25 = (
        db.query(func.avg(SmartCityData.PM25))
        .scalar()
        or 0
    )

    average_pm10 = (
        db.query(func.avg(SmartCityData.PM10))
        .scalar()
        or 0
    )

    return {
        "average_aqi": round(float(average_aqi), 2),
        "average_pm25": round(float(average_pm25), 2),
        "average_pm10": round(float(average_pm10), 2),
    }


def filter_air_quality(
    db: Session,
    category: str = None,
    status: str = None,
):

    query = db.query(SmartCityData)

    if category:
        query = query.filter(
            func.lower(SmartCityData.AQI_Category)
            == category.lower()
        )

    if status:
        query = query.filter(
            func.lower(SmartCityData.Air_Quality_Status)
            == status.lower()
        )

    return query.all()


def get_aqi_category_statistics(db: Session):

    results = (
        db.query(
            SmartCityData.AQI_Category,
            func.count(SmartCityData.AQI_Category)
        )
        .group_by(SmartCityData.AQI_Category)
        .all()
    )

    return {
        category: count
        for category, count in results
    }


# ============================================================
# WATER MODULE
# ============================================================

def get_water_summary(db: Session):

    average_water_level = (
        db.query(func.avg(SmartCityData.Water_Level))
        .scalar()
        or 0
    )

    average_consumption = (
        db.query(func.avg(SmartCityData.Water_Consumption))
        .scalar()
        or 0
    )

    average_pressure = (
        db.query(func.avg(SmartCityData.Water_Pressure))
        .scalar()
        or 0
    )

    leakage_count = (
        db.query(SmartCityData)
        .filter(
            func.lower(SmartCityData.Leakage).in_(["yes", "true", "1"])
        )
        .count()
    )

    return {
        "average_water_level": round(
            float(average_water_level), 2
        ),
        "average_consumption": round(
            float(average_consumption), 2
        ),
        "average_pressure": round(
            float(average_pressure), 2
        ),
        "leakage_count": leakage_count,
    }


def get_water_leakages(db: Session):

    return (
        db.query(SmartCityData)
        .filter(
            func.lower(SmartCityData.Leakage).in_(["yes", "true", "1"])
        )
        .all()
    )


def get_water_supply_statistics(db: Session):

    results = (
        db.query(
            SmartCityData.Supply_Status,
            func.count(SmartCityData.Supply_Status)
        )
        .group_by(SmartCityData.Supply_Status)
        .all()
    )

    return {
        status: count
        for status, count in results
    }


# ============================================================
# ENERGY MODULE
# ============================================================

def get_energy_summary(db: Session):

    average_consumption = (
        db.query(
            func.avg(SmartCityData.Energy_Consumption)
        )
        .scalar()
        or 0
    )

    average_renewable = (
        db.query(
            func.avg(SmartCityData.Renewable_Energy)
        )
        .scalar()
        or 0
    )

    average_voltage = (
        db.query(
            func.avg(SmartCityData.Voltage)
        )
        .scalar()
        or 0
    )

    outage_count = (
        db.query(SmartCityData)
        .filter(
            func.lower(SmartCityData.Power_Outage).in_(["yes", "true", "1"])
        )
        .count()
    )

    return {
        "average_consumption": round(
            float(average_consumption), 2
        ),
        "average_renewable": round(
            float(average_renewable), 2
        ),
        "average_voltage": round(
            float(average_voltage), 2
        ),
        "outage_count": outage_count,
    }


def get_energy_source_statistics(db: Session):

    results = (
        db.query(
            SmartCityData.Energy_Source,
            func.count(SmartCityData.Energy_Source)
        )
        .group_by(SmartCityData.Energy_Source)
        .all()
    )

    return {
        source: count
        for source, count in results
    }


def get_power_outage_records(db: Session):

    return (
        db.query(SmartCityData)
        .filter(
            func.lower(SmartCityData.Power_Outage).in_(["yes", "true", "1"])
        )
        .all()
    )


# ============================================================
# CRIME & PUBLIC SAFETY MODULE
# ============================================================

def get_crime_summary(db: Session):

    total_incidents = (
        db.query(
            func.sum(SmartCityData.Incident_Count)
        )
        .scalar()
        or 0
    )

    average_response_time = (
        db.query(
            func.avg(
                SmartCityData.Police_Response_Time
            )
        )
        .scalar()
        or 0
    )

    hotspot_count = (
        db.query(SmartCityData)
        .filter(
            func.lower(SmartCityData.Crime_Hotspot)
            == "yes"
        )
        .count()
    )

    emergency_count = (
        db.query(SmartCityData)
        .filter(
            func.lower(SmartCityData.Emergency_Alert)
            == "yes"
        )
        .count()
    )

    return {
        "total_incidents": int(total_incidents),
        "average_response_time": round(
            float(average_response_time), 2
        ),
        "hotspot_count": hotspot_count,
        "emergency_alerts": emergency_count,
    }


def get_crime_type_statistics(db: Session):

    results = (
        db.query(
            SmartCityData.Crime_Type,
            func.sum(
                SmartCityData.Incident_Count
            ).label("incidents")
        )
        .group_by(SmartCityData.Crime_Type)
        .all()
    )

    return {
        crime_type: int(incidents or 0)
        for crime_type, incidents in results
    }


def get_crime_severity_statistics(db: Session):

    results = (
        db.query(
            SmartCityData.Crime_Severity,
            func.count(SmartCityData.Crime_Severity)
        )
        .group_by(SmartCityData.Crime_Severity)
        .all()
    )

    return {
        severity: count
        for severity, count in results
    }


def get_crime_hotspots(db: Session):

    return (
        db.query(SmartCityData)
        .filter(
            func.lower(SmartCityData.Crime_Hotspot)
            == "yes"
        )
        .all()
    )


# ============================================================
# LOCATION / ZONE STATISTICS
# ============================================================

def get_zone_statistics(db: Session):

    results = (
        db.query(
            SmartCityData.Zone,
            func.count(SmartCityData.Zone)
        )
        .group_by(SmartCityData.Zone)
        .all()
    )

    return {
        zone: count
        for zone, count in results
    }