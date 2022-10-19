import requests
import json
from pathlib import Path


def get_config():
    username = "admin@sisensepoc.com"
    password = "i#2bgYQ8C6iMFmJWVD5t"
    url = "https://magpie-sisense-dev.sisensepoc.com/"
    return (url, username, password)


def authenticate(url, username, password):
    url = f"{url}api/v1/authentication/login"
    payload = json.dumps({"username": username, "password": password})
    headers = {"Content-Type": "application/json"}
    response = requests.request("POST", url, headers=headers, data=payload)
    try:
        return json.loads(response.text)["access_token"]
    except:
        print("There has been an authentication issue.")
        print(json.loads(response.text))
        return


def create_new_asset(url, headers, asset, endpoint, query_string):
    post_url = f"{url}{endpoint}{query_string}"
    payload = json.dumps(asset)
    response = requests.request("POST", post_url, headers=headers, data=payload)

    new_oid = json.loads(response.text)["oid"]

    build_url = f"{url}api/v2/builds"
    print(build_url)
    payload = json.dumps(
        {
            "datamodelId": new_oid,
            "buildType": "full",
            "rowLimit": 0,
            "schemaOrigin": "latest",
        }
    )

    print(payload)
    response = requests.request("POST", build_url, headers=headers, data=payload)
    print(response.text)


def delete_existing_assets(url, headers):
    get_endpoint = "api/v2/datamodels/schema"
    get_url = f"{url}{get_endpoint}"
    response = requests.request("GET", get_url, headers=headers)
    for asset in json.loads(response.text):
        oid = asset["oid"]
        delete_endpoint = f"api/v2/datamodels/{oid}"
        delete_url = f"{url}{delete_endpoint}"
        response = requests.request("DELETE", delete_url, headers=headers)


if __name__ == "__main__":
    url, username, password = get_config()
    access_token = authenticate(url, username, password)
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
    }

    directory = "sisense_assets"
    parent_directory = "./"
    parent_directory_path = Path(parent_directory) / directory
    asset_types = [
        "dashboards",
        "datamodels",
        "plugins",
        "themes",
        "palettes",
        "fonts",
        "security",
        "hierarchies",
    ]
    endpoints = {
        "dashboards": "",
        "datamodels": "api/v2/datamodel-imports/schema",
        "plugins": "",
        "themes": "",
        "palettes": "",
        "fonts": "",
        "security": "",
        "hierarchies": "",
    }

    delete_existing_assets(url, headers)
    asset_type = "datamodels"
    directory = parent_directory_path / "datamodels"
    p = directory.glob("**/*")
    files = [x for x in p if x.is_file()]
    for file in files:
        with open(file) as f:
            asset = json.load(f)
            if asset_type == "datamodels":
                newTitle = asset["title"]
                query_string = f"?newTitle={newTitle}"
            create_new_asset(url, headers, asset, endpoints[asset_type], query_string)
