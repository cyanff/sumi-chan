# ☁️ Sumi-chan: Your Kawaiiii AI Summarization Assistant ☁️
![sumi](https://github.com/cyanff/hackathon/assets/42996044/8dc84eee-7860-4ee7-80c4-cb4998a61e67)

## The Cutest Way to Summarize Webpages!

Sumi-chan is the most kawaii AI summarization assistant you'll ever meet!  ٩(๑>◡<๑)۶ 

With just a click of the extension icon, Sumi-chan will appear and summarize the page for you in the most adorable way possible!

Sumi-chan could even answer any question you throw her way after summarizing the page. And the best part? She'll change her expressions as you chat with her, making every interaction feel like a heartwarming conversation with your favorite anime character! (◡‿◡✿)

## Features
![sumi_demo](https://github.com/cyanff/hackathon/assets/42996044/942eb3b2-e437-4061-ae21-7ccac014805e)

- **Instant Page Summarization**: No more wasting time reading through walls of text! Sumi-chan will summarize any webpage at the click of a button, giving you the key points in a concise and easy-to-understand way.

- **Interactive Q&A**: After summarizing the page, you can ask Sumi-chan any question related to the content, and she'll provide you with a detailed and informative response, all while maintaining her adorable persona.

- **Short-term memory**: Sumi-chan has short-term memory loss >///< She has memory of the active chat window! But if you refresh the page, it'll wipe her memory!

- **Expressive Animations**: Sumi-chan isn't just a disembodied text – she's an animated character with a wide range of expressions that will change based on the context of your conversation!


## Installation

1. Simply clone this github repo.
2. Run `npm i`
3. Build the project! `npm run build`
4. In chrome, navigate to `manage extension`
5. Enable developer mode
6. Click on load unpacked, select the dist/ directory in the repository you cloned.


## Usage
1. Go to any page you'd like to summarize and click on the extension's icon.
2. Watch in awe as Sumi-chan appears, reads the page, and provides you with a concise summary!
3. After the summary, you can start chatting with Sumi-chan and asking her questions. Prepare to be amazed by her knowledge and charmed by her adorable expressions!

## Architecture and Technical Notes
- Uses Chrome extension APIs, React for the frontend, and Anthropic API for backend processing.
- Uses Event listeners for user interactions, with state management in React for UI responsiveness.
- React State Management:
  - Short-term Memory: Stores and updates conversation history for coherent AI responses.
  - Context Injection: Sends combined current prompt and conversation history to AI for context-aware responses.
  - Sentiment System: Analyzes sentiment of user responses to adjust UI dynamically, reflecting the emotion of the response.
![image](https://github.com/cyanff/sumi-chan/assets/42996044/94d2dc2e-1bd7-415c-a027-da5afc94ed04)

Here's what the timeline looks like:
- The user clicks on the extension
- The background script event listener injects main.js into the current page
- React is bootstraped, and the overlay is rendered

- Everything is rendered inside of a contained Shadow DOM! So there won't be any Sumi-chan leakage!
![image](https://github.com/cyanff/sumi-chan/assets/42996044/e0fa063e-b8f8-4c72-b0f7-70d4e6dfb0a2)

## Support
If you encounter any issues or have questions about Sumi-chan, please don't hesitate to ask me on [Discord](https://discord.gg/CNGAZrahmA)! 

## License
Sumi-chan is released under the MIT License
Feel free to use, modify, and distribute the code as you see fit.


## Conclusion
Sumi-chan is more than just a summarization tool – she's a companion, a friend, and a source of endless kawaii joy! Install her today and experience the magic of having your very own AI anime girl assistant by your side. Trust us, once you've experienced Sumi-chan's charm, you'll never want to browse the web without her again! 🌸

Made with ❤️ by cyan and snavu @[moecorp](https://www.anime.gf/)


sumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumisumi

May her glorious empire spans the vast galaxy, enduring until the very end. (✿^_^)




![image](https://github.com/cyanff/hackathon/assets/79063400/595e3992-0587-440f-8070-78b73ddf3033)

