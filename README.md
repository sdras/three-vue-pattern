# Three Vue Pattern

This project brings together a few concepts, outlined below:

## Three.js, Vue, and LUIS

I have wanted to be able to update a three.js visualization on the fly with Vue for a little while ago. This app started with the base concepts outlined in [this repo](https://github.com/colordodge/ThreeJS_Kaleidoscope) and refactors/extends them to be manipulated by your emotion based on speech. You can update the visualization (through state in Vuex) by using [LUIS](https://aka.ms/luishome) to analyze your speech.

[LUIS](https://aka.ms/luishome) is a machine learning based service to build natural language through the use of custom models that can continuously improve. We can use this for apps, bots, and even IoT devices. Here we're guiding our visualization, first by telling it our mood, and then we're able to control with it with our voice to update it on the fly and without the use of our hands. The purpose of this demo is to create a biofeedback visualization for those who are trying to guide themselves through healing. There's more information in my Live and Machine Learn talk that I will be giving at Microsoft Build, and possibly a subsequent article.

![demo-image](https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/demo-ex.png)

This project was created in collaboration with [Brian Holt](https://github.com/btholt).

---

To install dependencies and set up a dev server, run:

```
yarn
yarn serve
```

This will set up a server at `localhost:8080`.
