gebo-graph
==========

A connected graph for the gebo-server


# Installation

```
sudo npm install gebo-graph
```

# Configuration

gebo-graph contains mongo schemata that need to be added to the gebo. This is best
done in the app's entry point, prior to starting the gebo server.

```
var graph = require('gebo-graph');

...

gebo.schemata.add(graph.schemata);

...

gebo.start();
```

# Contributing

Hit me with it

# Licence

MIT

