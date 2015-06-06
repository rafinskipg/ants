#ants

**NodeJS ants game, communication with Socket.IO**

In this example the core processing of the game is made by the server side, and it just sends  JSON containing the new state to the clients, the clients will refresh it's interface and paint the new state with a canvas or whatever. 

## Rules

When the queen ant dies, you lose. If you manage to have a big colony you can create a new queen ant create more colonies.


## Relation of models

### Colony

A colony holds a `queen ant`, various `food stores` and various types of `ants`.

It is responsible of:
- Creating new ants
- Assigning actions to the ants
- Checking supplies and deciding what to do next

It has :
- A position on the map
- A size based on cell terrains that can be excavated
- A starting small food store.
- Some starting ants
- Incubation chamber
- A queen ant

### Food stores

A food store stores some supplies it has :
- A capacity based on it's size
- An amount of workers assigned
- Cellterrains that can be excavated
- An API for adding and removing supplies

### Ants

There are different kind of ants based on it's job and generation.

- First ants will be smaller than the next generation's ones.
- Jobs can be :
  - miner: *usefull for making your colony bigger*
  - warrior: *bigger ants designed to war, used when multiplayer*
  - explorer: *search for food on the outside of the colony, once it is found it goes back to the colony*
  - childcare: *works taking care of the small ant eggs*
  - foodmanager: *works at a food store, giving supplies to other ants*

## Technical considerations:

- Allow  the colony to decide which action is the better in order to make a game that can be autoplayed but design it in a way that a user can be added and control the ants and colony actions.
[] can be events the response?

- Allow to set specific actions to ants, so if a player it's added it can control them
- Allow to excavate at certain coordinates, excavation could bring some hidden resources
- Design the colony initialization in a way it could be predefined in a JSON, so maps can be created and stored.
- Allow to change the time speed but design different timelines, one for day/night , other for movements, other for actions, other for time-injuries like hunger.
- Think a way of scaling the `tick` processes.
