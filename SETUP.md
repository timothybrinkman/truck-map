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
- **Turn list (or the Turns tab):** every step of the route. Tap any step to see it on the map.
- **Copy directions:** copies the route as text, so you can paste it into a text message for a driver.
- **☆ next to a stop:** saves that place (the yard, a job site, a customer). Saved places show up first when you tap a stop box.
- **Saved tab:** has your last 12 trips. They open with no signal.
- **☾ / ☀ button:** switches between day and night colors.
- **Long trips:** shows "About X driving days at 11 hrs/day".

## Drive mode (live turn-by-turn)

1. Plan a route, then tap **▶ Start driving** on the route card. Allow location when the phone asks.
2. Put the phone on a mount and plug it in. Navigation uses a lot of battery.
3. While you drive:
   - The green banner shows the next turn and counts down the distance.
   - The app speaks the turns: an early warning (for example "In 1 mile, take the Interstate 80 West ramp…") and a second prompt right at the turn.
   - Miss a turn and it reroutes on its own from where you are, still using your truck's height, weight and length.
   - **Overview** shows the rest of the trip. **Re-center** goes back to following you.
   - **🔊** turns the voice on or off. **End** finishes the drive.
   - The bottom bar shows your arrival time and the miles and time left. That's driving time only, with no breaks counted.

**Preview the drive** (on the route card) plays a simulated drive at 4× speed so you can see and hear how it works without moving. It's handy for showing someone the app.

**Limits, because it's a web app:**
- The app must stay open and on screen. If you lock the phone or switch apps, guidance pauses until you come back.
- The app asks the phone to keep the screen on. On iPhone, this works in an installed home-screen app only on iOS 18.4 or newer. If the screen still dims, set **Settings → Display & Brightness → Auto-Lock → Never** while driving.
- If you don't hear the voice, turn the volume up and check the ring/silent switch.
- Rerouting needs a signal. With no signal it keeps showing the planned route and tries again later.
- There's no CarPlay, no Android Auto and no lane guidance.

## With no signal

The app opens, and saved trips, turn lists and any map areas you've already looked at still work. New searches and new routes need a signal.

## The free services it uses

| Job | Service | Rules |
|---|---|---|
| Map | OpenFreeMap (tiles.openfreemap.org) | Free, no key |
| Truck routing | Valhalla run by FOSSGIS (valhalla1.openstreetmap.de) | Free, at most 1 request per second (the app spaces requests for you), no uptime promise |
| Long-trip split points | OSRM car router run by FOSSGIS (routing.openstreetmap.de) | Same rules as above. Used only on long trips |
| Address search | Photon by komoot (photon.komoot.io) | Free for reasonable use, no uptime promise |

The free truck router takes at most about 930 miles (1,500 km) in a straight line per request. For longer trips, like Columbus to either coast, the app gets the car route once and picks split points on Interstates along it. It then routes your truck one piece at a time and joins the pieces into one trip with one turn list. A coast-to-coast trip takes about 5–10 seconds to plan.

These are fine for you and a few drivers. If a whole fleet starts using it every day, run your own Valhalla server or switch to a paid routing service. To do that, change only the `VALHALLA` and `PHOTON` lines near the top of the script in `index.html`.

## Important limits

- Truck restrictions (low bridges, weight limits, no-truck roads) come from OpenStreetMap, and some are missing, especially in small towns and rural areas. **Always follow posted signs and state rules.**
- Oversize or overweight loads must follow the route on the permit.
- Drive mode gives voice turn-by-turn guidance only while the app is open on screen (see Drive mode above).

## Updating the app later

1. Edit `index.html` and raise `APP_VERSION` near the top of the script.
2. In `sw.js`, raise `VERSION` (for example `truckmap-v1.0.1`) so installed phones pick up the change.
3. Upload both files to the repo. Phones get the new version the next time they open the app with a signal.

Saved places and trips stay on each phone. Use **Saved → Download backup** before switching phones, then **Restore backup** on the new one.

## Credits

Map data © OpenStreetMap contributors (ODbL). Map tiles by OpenFreeMap / OpenMapTiles. Routing by Valhalla and OSRM (FOSSGIS). Search by Photon (komoot). Map display by MapLibre GL JS (BSD license, see `vendor/MAPLIBRE-LICENSE.txt`).
