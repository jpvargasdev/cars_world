# Cars World - Road Network Editor

A visual editor for designing road networks and maps for the self-driving car simulation.

## Features

- **Graph-based Road Editor**: Create road networks by placing points and connecting them
- **Road Markings**: Add various road elements:
  - Stop signs
  - Yield signs
  - Crossings
  - Parking spots
  - Traffic lights
  - Start points
  - Target destinations
- **Save/Load**: Export and import world files (`.world` format)
- **Viewport Controls**: Pan and zoom to navigate large maps

## Usage

```bash
npm install
npm start
```

### Tools

| Tool | Description |
|------|-------------|
| Graph | Create and edit road network nodes and connections |
| Stop | Place stop sign markings |
| Yield | Place yield sign markings |
| Crossing | Add pedestrian crossings |
| Parking | Define parking areas |
| Light | Add traffic lights |
| Start | Set starting positions for cars |
| Target | Set destination targets |

### Controls

- **Save**: Export the current world to a `.world` file
- **Delete**: Clear the entire world
- **Load**: Import a previously saved world file

## File Format

Worlds are saved as JSON files with the `.world` extension, containing:
- Graph data (points and segments)
- Road markings and their positions
- Viewport state (zoom and offset)
