from ast import arg
import sys
import requests
import json
from pathlib import Path
import shutil
import os
import yaml


def create_directory():
    directory = "sisense_assets"
    parent_directory = "./"
    parent_directory_path = Path(parent_directory) / directory
    if parent_directory_path.exists() and parent_directory_path.is_dir():
        shutil.rmtree(parent_directory_path)
    parent_directory_path.mkdir(parents=True, exist_ok=True)
    sub_directories = [
        "dashboards",
        "datamodels",
        "plugins",
        "themes",
        "palettes",
        "fonts",
        "security",
        "hierarchies",
    ]
    for sub_directory in sub_directories:
        subdirpath = parent_directory_path / sub_directory
        subdirpath.mkdir(parents=True, exist_ok=True)
    return parent_directory_path


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


def export_datamodel(url, headers, oid, path):
    # TODO: use model name instead of id, they change between instances
    dm_url = (
        f"{url}api/v2/datamodel-exports/schema?datamodelId={oid}&type=schema-latest"
    )
    response = requests.request("GET", dm_url, headers=headers)
    with open(f"{path}/datamodels/{oid}.smodel", "w") as f:
        f.write(response.text)
    datamodel = json.loads(response.text)
    export_datasecurity(url, headers, datamodel["title"], path)
    export_hierarchies(url, headers, datamodel["title"], path)


def export_dashboard(url, headers, oid, path):
    url = f"{url}api/v1/dashboards/{oid}/export/dash"
    response = requests.request("GET", url, headers=headers)
    with open(f"{path}/{oid}.dash", "wb") as f:
        f.write(response.content)


def export_plugin(url, headers, id, path):
    url = f"{url}api/v1/v1/plugins/{id}/export"
    response = requests.request("GET", url, headers=headers, stream=True)
    id = id.replace("/", "_")
    with open(f"{path}/{id}.zip", "wb") as fd:
        fd.write(response.content)


def export_themes(url, headers, oid, path):
    url = f"{url}api/v1/themes/{oid}"
    response = requests.request("GET", url, headers=headers)
    with open(f"{path}/{oid}.json", "wb") as f:
        f.write(response.content)


def export_palettes(url, headers, oids, path):
    url = f"{url}api/palettes/"
    response = requests.request("GET", url, headers=headers)
    palettes = json.loads(response.text)
    # TODO: use pallete name instead of id, they change between instances
    for palette in palettes:
        if palette["_id"] in oids:
            palette_id = palette["_id"]
            with open(f"{path}/{palette_id}.json", "w") as f:
                f.write(str(palette))


def export_datasecurity(url, headers, name, path):
    url = f"{url}api/elasticubes/localhost/{name}/datasecurity"
    response = requests.request("GET", url, headers=headers)
    with open(f"{path}/security/{name}.json", "wb") as f:
        f.write(response.content)


def export_hierarchies(url, headers, name, path):
    url = f"{url}api/elasticubes/hierarchies/?elasticube={name}&server=localhost"
    response = requests.request("GET", url, headers=headers)
    with open(f"{path}/hierarchies/{name}.json", "wb") as f:
        f.write(response.content)


if __name__ == "__main__":

    username = os.environ["SISENSE_USERNAME"]
    password = os.environ["SISENSE_PASSWORD"]
    url = os.environ["SISENSE_URL"]

    path = create_directory()
    access_token = authenticate(url, username, password)
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/octet-stream",
    }

    with open("./sisense_assets_config.yml", "r") as stream:
        try:
            sisense_assets_config = yaml.safe_load(stream)
            dashboard_oids = sisense_assets_config["dashboards"]
            datamodel_oids = sisense_assets_config["datamodels"]
            plugin_ids = sisense_assets_config["plugins"]
            theme_ids = sisense_assets_config["themes"]
            palette_ids = sisense_assets_config["palettes"]

        except yaml.YAMLError as exc:
            print(exc)

    for datamodel_oid in datamodel_oids:
        export_datamodel(url, headers, datamodel_oid, f"{path}")

    for dashboard_oid in dashboard_oids:
        export_dashboard(url, headers, dashboard_oid, f"{path}/dashboards/")

    for plugin_id in plugin_ids:
        export_plugin(url, headers, plugin_id, f"{path}/plugins/")

    for theme_id in theme_ids:
        export_themes(url, headers, theme_id, f"{path}/themes/")

    export_palettes(url, headers, palette_ids, f"{path}/palettes/")
