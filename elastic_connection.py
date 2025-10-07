# elastic_connection.py
from elasticsearch import Elasticsearch

CLOUD_ID = "YOUR_CLOUD_ID"   # from Elastic Cloud
USERNAME = "elastic"
PASSWORD = "YOUR_PASSWORD"

es = Elasticsearch(
    cloud_id=CLOUD_ID,
    basic_auth=(USERNAME, PASSWORD)
)

# Test connection
print(es.info())
