# Truck Map – setup

Truck Map gives truck-safe routes anywhere in the lower 48, Alaska and Hawaii. It uses free OpenStreetMap services. Routes take your truck's height, weight, length, axles and hazmat status into account. The app runs in a phone's web browser and can be installed like an app.

## What's in the folder

```
truck-map/
  index.html            the app
  sw.js                 lets the app open with no signal
  manifest.json         lets it install to the home screen
  icon.svg, icon-192.png, icon-512.png, apple-touch-icon.png
  vendor/maplibre-gl.js, vendor/maplibre-gl.css   map library (no outside download needed)
  vendor/MAPLIBRE-LICENSE.txt
  SETUP.md              this file
```

## Put it on GitHub Pages (about 5 minutes, easiest on a computer)

1. Go to github.com and sign in as **timothybrinkman**.
2. Click **+** at the top right, then **New repository**. Name it `truck-map`, set it to **Public**, and click **Create repository**.
3. Click **uploading an existing file**. Drag in everything inside the `truck-map` folder, including the `vendor` folder, then click **Commit changes**.
4. In the repo, go to **Settings**, then **Pages**. Under "Build and deployment", pick **Deploy from a branch**, choose branch **main** and folder **/ (root)**, and click **Save**.
5. Wait a minute or two. Your app will be at **https://timothybrinkman.github.io/truck-map/**

GitHub Pages serves the app over HTTPS, which "My location", the location dot and offline mode need.

## Install it on a phone

- **iPhone / iPad:** open the link in **Safari**, tap **Share** (the square with the arrow), then tap **Add to Home Screen**.
- **Android:** open the link in **Chrome**, tap the **⋮** menu, then tap **Install app** (or **Add to Home screen**).

## Using it

- **First open:** pick your truck (Semi, Dump truck, Lowboy, or Custom). Change any number to match your rig. Height matters most.
- **Plan a trip:** type a town, address or business, or paste coordinates like `41.43, -97.36`. You can also tap the map and choose **Start here**, **Add stop** or **Go here**. The route comes up as soon as every stop is filled in.
- **Turns:** gives the turn-by-turn list. Tap any step to see it on the map.
- **Copy directions:** copies the route as text, so you can paste it into a text message for a driver.
- **☆ next to a stop:** saves that place (the yard, a job site, a customer). Saved places show up first when you tap a stop box.
- **Saved tab:** has your last 12 trips. They open with no signal.
- **☾ / ☀ button:** switches between day and night colors.
- **Long trips:** shows "About X driving days at 11 hrs/day".

## With no signal

The app opens, and saved trips, turn lists and any map areas you've already looked at still work. New searches and new routes need a signal.

## The free services it uses

| Job | Service | Rules |
|---|---|---|
| Map | OpenFreeMap (tiles.openfreemap.org) | Free, no key |
| Truck routing | Valhalla run by FOSSGIS (valhalla1.openstreetmap.de) | Free, at most 1 request per second (the app spaces requests for you), no uptime promise |
| Address search | Photon by komoot (photon.komoot.io) | Free for reasonable use, no uptime promise |

These are fine for you and a few drivers. If a whole fleet starts using it every day, run your own Valhalla server or switch to a paid routing service. To do that, change only the `VALHALLA` and `PHOTON` lines near the top of the script in `index.html`.

## Important limits

- Truck restrictions (low bridges, weight limits, no-truck roads) come from OpenStreetMap, and some are missing, especially in small towns and rural areas. **Always follow posted signs and state rules.**
- Oversize or overweight loads must follow the route on the permit.
- This is a route planner with a live location dot. It does not give voice turn-by-turn guidance.

## Updating the app later

1. Edit `index.html` and raise `APP_VERSION` near the top of the script.
2. In `sw.js`, raise `VERSION` (for example `truckmap-v1.0.1`) so installed phones pick up the change.
3. Upload both files to the repo. Phones get the new version the next time they open the app with a signal.

Saved places and trips stay on each phone. Use **Saved → Download backup** before switching phones, then **Restore backup** on the new one.

## Credits

Map data © OpenStreetMap contributors (ODbL). Map tiles by OpenFreeMap / OpenMapTiles. Routing by Valhalla (FOSSGIS). Search by Photon (komoot). Map display by MapLibre GL JS (BSD license, see `vendor/MAPLIBRE-LICENSE.txt`).
