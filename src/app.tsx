import React from "react";
// @ts-ignore
import globalCSS from "bundle-text:./global.css";

const grugText = `The Grug Brained Developer
A layman's guide to thinking like the self-aware smol brained
Introduction
this collection of thoughts on software development gathered by grug brain developer

grug brain developer not so smart, but grug brain developer program many long year and learn some things although mostly still confused

grug brain developer try collect learns into small, easily digestible and funny page, not only for you, the young grug, but also for him because as grug brain developer get older he forget important things, like what had for breakfast or if put pants on

big brained developers are many, and some not expected to like this, make sour face

THINK they are big brained developers many, many more, and more even definitely probably maybe not like this, many sour face (such is internet)

(note: grug once think big brained but learn hard way)

is fine!

is free country sort of and end of day not really matter too much, but grug hope you fun reading and maybe learn from many, many mistake grug make over long program life

The Eternal Enemy: Complexity
apex predator of grug is complexity

complexity bad

say again:

complexity very bad

you say now:

complexity very, very bad

given choice between complexity or one on one against t-rex, grug take t-rex: at least grug see t-rex

complexity is spirit demon that enter codebase through well-meaning but ultimately very clubbable non grug-brain developers and project managers who not fear complexity spirit demon or even know about sometime

one day code base understandable and grug can get work done, everything good!

next day impossible: complexity demon spirit has entered code and very dangerous situation!

grug no able see complexity demon, but grug sense presence in code base

demon complexity spirit mocking him make change here break unrelated thing there what!?! mock mock mock ha ha so funny grug love programming and not becoming shiney rock speculator like grug senior advise

club not work on demon spirit complexity and bad idea actually hit developer who let spirit in with club: sometimes grug himself!

sadly, often grug himself

so grug say again and say often: complexity very, very bad

Saying No
best weapon against complexity spirit demon is magic word: "no"

"no, grug not build that feature"

"no, grug not build that abstraction"

"no, grug not put water on body every day or drink less black think juice you stop repeat ask now"

note, this good engineering advice but bad career advice: "yes" is magic word for more shiney rock and put in charge of large tribe of developer

sad but true: learn "yes" then learn blame other grugs when fail, ideal career advice

but grug must to grug be true, and "no" is magic grug word. Hard say at first, especially if you nice grug and don't like disappoint people (many such grugs!) but easier over time even though shiney rock pile not as high as might otherwise be

is ok: how many shiney rock grug really need anyway?

Saying ok
sometimes compromise necessary or no shiney rock, mean no dinosaur meat, not good, wife firmly remind grug about young grugs at home need roof, food, and so forth, no interest in complexity demon spirit rant by grug for fiftieth time

in this situation, grug recommend "ok"

"ok, grug build that feature"

then grug spend time think of 80/20 solution to problem and build that instead.
80/20 solution say "80 want with 20 code" solution maybe not have all bell-whistle that project manager want, maybe a little ugly, but work and deliver most value, and keep demon complexity spirit at bay for most part to extent

sometimes probably best just not tell project manager and do it 80/20 way. easier forgive than permission, project managers mind like butterfly at times overworked and dealing with many grugs. often forget what even feature supposed to do or move on or quit or get fired grug see many such cases

anyway is in project managers best interest anyway so grug not to feel too bad for this approach usually

Factoring Your Code
next strategy very harder: break code base up properly (fancy word: "factor your code properly") here is hard give general advice because each system so different. however, one thing grug come to believe: not factor your application too early!

early on in project everything very abstract and like water: very little solid holds for grug's struggling brain to hang on to. take time to develop "shape" of system and learn what even doing. grug try not to factor in early part of project and then, at some point, good cut-points emerge from code base

good cut point has narrow interface with rest of system: small number of functions or abstractions that hide complexity demon internally, like trapped in crystal

grug quite satisfied when complexity demon trapped properly in crystal, is best feeling to trap mortal enemy!

grug try watch patiently as cut points emerge from code and slowly refactor, with code base taking shape over time along with experience. no hard/ fast rule for this: grug know cut point when grug see cut point, just take time to build skill in seeing, patience

sometimes grug go too early and get abstractions wrong, so grug bias towards waiting

big brain developers often not like this at all and invent many abstractions start of project

grug tempted to reach for club and yell "big brain no maintain code! big brain move on next architecture committee leave code for grug deal with!"

but grug learn control passions, major difference between grug and animal

instead grug try to limit damage of big brain developer early in project by giving them thing like UML diagram (not hurt code, probably throw away anyway) or by demanding working demo tomorrow

working demo especially good trick: force big brain make something to actually work to talk about and code to look at that do thing, will help big brain see reality on ground more quickly

remember! big brain have big brain! need only be harness for good and not in service of spirit complexity demon on accident, many times seen

(best grug brain able to herd multiple big brain in right direction and produce many complexity demon trap crystals, large shiney rock pile awaits such grug!)

also sometimes call demo approach "prototype", sound fancier to project manager

grug say prototype early in software making, especially if many big brains
`;

function App() {
  const [text, setText] = React.useState("Hello, World!");

  async function call() {
    // send a message to the background script
    const res = await chrome.runtime.sendMessage({
      action: "summarize",
      content: grugText,
    });

    setText(res);
    console.log(res);
  }

  return (
    <>
      <style>{globalCSS}</style>
      <div className="h-96 w-96 bg-neutral-200 p-4">{text}</div>
      <button
        className="bg-neutral-900 text-white px-4 py-2 rounded-md"
        onClick={call}
      >
        Test
      </button>
    </>
  );
}

export default App;
