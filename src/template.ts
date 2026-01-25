export const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Fira+Code&display=swap');
:root {
  /* Colors - Backgrounds */
  --background-primary: #313338;
  --background-secondary: #2b2d31; 
  --background-tertiary: #1e1f22; 
  --background-accent: #404249;
  --background-floating: #1e1f22;
  --background-surface-high: #2b2d31;
  --background-modifier-hover: rgba(78, 80, 88, 0.2);
  
  /* Colors - Text */
  --text-normal: #dbdee1;
  --text-muted: #949ba4;
  --text-link: #00a8fc;
  --header-primary: #f2f3f5;
  --header-secondary: #b5bac1;
  
  /* Colors - Interactive */
  --interactive-normal: #b5bac1;
  --interactive-hover: #dbdee1;
  --interactive-active: #ffffff;
  
  /* Colors - Brand & Status */
  --brand-experiment: #5865f2;
  --danger: #da373c;
  --positive: #23a559;
  --warning: #f0b232; 
  
  /* Colors - Buttons (HSL) */
  --button-primary-bg: #5865f2;
  --button-primary-hover: #4752c4;
  --button-secondary-bg: #4e5058;
  --button-secondary-hover: #6d6f78;
  --button-success-bg: #248046;
  --button-success-hover: #1a6334;
  --button-destructive-bg: #da373c;
  --button-destructive-hover: #a12828;
  
  /* Components */
  --border-subtle: rgba(78, 80, 88, 0.48);
  --separator-color: #4f5359;
  --mention-bg: rgba(88, 101, 242, 0.3);
  --mention-hover-bg: rgba(88, 101, 242, 0.6);
  --container-bg: #2b2d31;
  
  /* Spacing & Layout */
  --space-xxs: 2px;
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  
  /* Radii */
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-round: 50%;
}
* { box-sizing: border-box; }
body {
  background-color: var(--background-primary);
  color: var(--text-normal);
  font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 1rem;
  line-height: 1.375rem;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
a { color: var(--text-link); text-decoration: none; }
a:hover { text-decoration: underline; }
h1, h2, h3 { color: var(--header-primary); margin: 16px 0 8px; font-weight: 700; line-height: 1.2; }
h1 { font-size: 1.5rem; }
h2 { font-size: 1.25rem; }
h3 { font-size: 1rem; }
/* Header */
.guild-header {
  background-color: var(--background-secondary);
  padding: 12px 16px;
  box-shadow: 0 1px 0 rgba(4,4,5,0.2), 0 1.5px 0 rgba(6,6,7,0.05), 0 2px 0 rgba(4,4,5,0.05);
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  height: 48px;
}
.guild-icon {
  width: 24px;
  height: 24px;
  border-radius: var(--radius-round);
  margin-right: 8px;
}
.guild-info h1 {
  font-size: 1rem;
  line-height: normal;
  font-weight: 600;
  color: var(--header-primary);
  margin: 0;
}
.channel-info {
  font-size: 0.875rem;
  color: var(--header-secondary);
  margin: 0;
  display: flex;
  align-items: center;
}
/* Chat Log */
.chatlog { padding: 0; max-width: 100%; }
.message-group {
    display: flex;
    margin-top: 1.0625rem;
    padding: 2px 16px;
    position: relative; 
}
.message-group:hover { background-color: rgba(0,0,0,0.03); }
.author-avatar {
    width: 40px;
    height: 40px; 
    border-radius: var(--radius-round);
    margin-right: 16px;
    margin-top: 2px;
    flex-shrink: 0;
}
.message-content-wrapper { flex: 1; min-width: 0; }
.message-header {
    display: flex;
    align-items: center;
    line-height: 1.375rem;
    min-height: 1.375rem;
}
.author-name {
    font-size: 1rem;
    font-weight: 500;
    color: var(--header-primary);
    margin-right: 0.25rem;
}
.bot-tag {
    background-color: var(--brand-experiment);
    color: #fff;
    font-size: 0.625rem;
    text-transform: uppercase;
    height: 0.9375rem;
    padding: 0 0.275rem;
    border-radius: 0.1875rem;
    line-height: 0.9375rem;
    font-weight: 500;
    margin-left: 0.25rem;
    margin-right: 0.25rem;
    display: inline-flex;
    align-items: center;
    gap: 2px;
}
.timestamp {
    font-size: 0.75rem;
    color: var(--text-muted);
    margin-left: 0.25rem;
    font-weight: 400;
}
.message-body {
    font-size: 1rem;
    line-height: 1.375rem;
    color: var(--text-normal);
    white-space: pre-wrap;
    word-wrap: break-word;
}
/* Embeds */
.embed {
    display: flex;
    max-width: 520px;
    background-color: var(--background-secondary);
    border-radius: 4px;
    border-left: 4px solid var(--background-tertiary);
    margin-top: 8px;
    padding: 8px 16px 16px 12px;
    flex-direction: column; 
    box-sizing: border-box;
}
.embed-grid { display: grid; max-width: 100%; }
.embed-author {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    margin-top: 4px;
    color: var(--header-primary);
    font-weight: 600;
    font-size: 0.875rem;
}
.embed-author-icon {
    width: 24px;
    height: 24px;
    border-radius: var(--radius-round);
    margin-right: 8px;
}
.embed-title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--header-primary);
    margin-bottom: 4px;
    display: inline-block;
}
.embed-description {
    font-size: 0.875rem;
    line-height: 1.125rem;
    color: var(--text-normal);
    white-space: pre-wrap;
    margin-bottom: var(--space-sm);
}
.embed-field { margin-top: 8px; }
.embed-field-name {
    color: var(--header-primary);
    font-weight: 600;
    font-size: 0.875rem;
    margin-bottom: 2px;
}
.embed-field-value {
    color: var(--text-normal);
    font-size: 0.875rem;
    white-space: pre-wrap;
}
.embed-footer {
     margin-top: 8px;
     display: flex;
     align-items: center;
     font-size: 0.75rem;
     color: var(--text-muted);
}
.embed-footer-icon {
    width: 20px;
    height: 20px;
    border-radius: var(--radius-round);
    margin-right: 8px;
}
.embed-image-large {
    margin-top: 10px;
    border-radius: var(--radius-xs);
    overflow: hidden;
    max-width: 100%;
    display: block;
}
.embed-image-large img {
    max-width: 100%;
    max-height: 400px;
    object-fit: contain; 
}
.embed-content { width: 100%; }
/* Attachments */
.attachment {
    margin-top: 8px;
    max-width: 520px;
    border-radius: 8px;
    overflow: hidden;
}
.attachment-image img {
    max-width: 100%;
    max-height: 350px;
    cursor: pointer;
    border-radius: 4px;
}
.mention {
    background-color: var(--mention-bg);
    color: #dee0fc;
    border-radius: 3px;
    padding: 0 2px;
    font-weight: 500;
    cursor: pointer;
}
.mention:hover {
    background-color: var(--mention-hover-bg);
    text-decoration: none;
    color: #fff;
}
/* Reply Reference */
.reply-reference {
    font-size: 0.875rem;
    color: var(--text-muted);
    margin-bottom: var(--space-xs);
    margin-left: 20px; 
    display: flex;
    align-items: center;
    position: relative;
}
.reply-reference::before {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: -36px;
    bottom: 0;
    right: 0;
    border-top: 2px solid #4e5058;
    border-left: 2px solid #4e5058;
    border-top-left-radius: 6px;
    width: 33px;
    height: 10px;
    margin-top: -1px;
    pointer-events: none;
}
.reply-user {
    font-weight: 600;
    margin-right: var(--space-xs);
    cursor: pointer;
}
.reply-user:hover { text-decoration: underline; }
.reply-avatar {
     width: 16px;
     height: 16px;
     border-radius: var(--radius-round);
     margin-right: var(--space-xs);
}
/* Discord V2 Component Styles (Design System Implementation) */
.discord-container {
    display: flex;
    flex-direction: column;
    background-color: var(--background-secondary);
    border: 1px solid var(--border-subtle);
    border-radius: 8px;
    padding: 12px;
    gap: 8px;
    margin-top: 8px;
    max-width: 520px;
}
.discord-base-image {
    overflow: hidden;
    position: relative;
    background: var(--background-secondary);
}
.discord-button {
    color: #fff !important;
    padding: 2px 16px;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 500;
    height: 32px;
    min-width: 60px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    transition: background-color 0.17s ease;
}
.discord-button-primary { background-color: var(--button-primary-bg); }
.discord-button-primary:hover { background-color: var(--button-primary-hover); }
.discord-button-secondary { background-color: var(--button-secondary-bg); }
.discord-button-secondary:hover { background-color: var(--button-secondary-hover); }
.discord-button-success { background-color: var(--button-success-bg); }
.discord-button-success:hover { background-color: var(--button-success-hover); }
.discord-button-destructive { background-color: var(--button-destructive-bg); }
.discord-button-destructive:hover { background-color: var(--button-destructive-hover); }
.discord-select-menu {
    margin-top: var(--space-xxs);
    margin-bottom: var(--space-xxs);
    position: relative;
    width: 100%;
    max-width: 400px;
    height: 40px;
    background-color: var(--background-tertiary);
    border-radius: 4px;
    color: var(--text-muted);
    cursor: pointer;
    font-family: Whitney, "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    padding: 0 12px;
    justify-content: space-between;
    box-sizing: border-box;
    border: 1px solid var(--background-tertiary);
}
.discord-media-gallery { display: grid; gap: var(--space-xs); border-radius: var(--radius-sm); overflow: hidden; margin-top: var(--space-sm); }
.discord-separator { background-color: var(--separator-color); width: 100%; display: block; }
.discord-section { display: flex; flex-direction: column; width: 100%; max-width: 500px; margin-top: var(--space-sm); }
.discord-section-content { display: flex; flex-direction: column; width: 100%; font-size: 0.875rem; line-height: 1.125rem; }
.discord-section-accessory { display: flex; width: 100%; max-width: 500px; justifyContent: flex-end; alignItems: center; }
.message-component-group {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 4px;
}
`;
export const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Transcript - {{channel.name}}</title>
    <style>
        {{css}}
    </style>
</head>
<body>
    <header class="guild-header">
        {{#channel.guildIconUrl}}
        <img src="{{channel.guildIconUrl}}" alt="Guild Icon" class="guild-icon">
        {{/channel.guildIconUrl}}
        <div class="guild-info">
            <h1>{{channel.name}}</h1>
            <div class="channel-info">{{channel.topic}}</div>
        </div>
    </header>
    <div class="chatlog">
        {{#messages}}
        <div class="message-group" id="message-{{id}}">
            
            <div class="message-content-wrapper">
                {{#replyTo}}
                <div class="reply-reference">
                   <img src="{{replyTo.author.avatarURL}}" class="reply-avatar">
                   <span class="reply-user" style="color: {{replyTo.author.color}};">@{{replyTo.author.username}}</span>
                   <span class="reply-content">{{replyTo.contentSnippet}}</span>
                </div>
                {{/replyTo}}
                <div class="message-header">
                     <img src="{{author.avatarURL}}" class="author-avatar" alt="{{author.username}}">
                    <span class="author-name" {{#author.color}}style="color:{{author.color}}"{{/author.color}}>{{author.username}}</span>
                    {{#author.bot}}<span class="bot-tag"><svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor"><path d="M7.47 10.78a.75.75 0 0 0 1.06 0l4.25-4.25a.75.75 0 0 0-1.06-1.06L8 9.19 6.28 7.47a.75.75 0 0 0-1.06 1.06l1.75 1.75Z"></path></svg>APP</span>{{/author.bot}}
                    <span class="timestamp">{{timestamp}}</span>
                </div>
                <div class="message-body">
                    {{{content}}}
                </div>
                {{!-- Attachments --}}
                {{#attachments}}
                <div class="attachment attachment-image">
                    <a href="{{url}}" target="_blank"><img src="{{url}}" alt="{{name}}"></a>
                </div>
                {{/attachments}}
                {{!-- Containers (V2) --}}
                {{#containers}}
                <div class="discord-container">
                    {{{content}}}
                </div>
                {{/containers}}
                {{!-- Components (Action Rows: Buttons & Select Menus) --}}
                {{#components}}
                <div class="message-component-group">
                    {{#components}}
                    
                    {{#isButton}}
                    <button class="discord-button discord-button-{{styleClass}}" type="button" {{#disabled}}disabled{{/disabled}}>
                        {{#emoji.id}}<span style="display: flex; align-items: center;"><img src="https://cdn.discordapp.com/emojis/{{emoji.id}}.webp?size=44&quality=lossless" alt="{{emoji.name}}" style="width: 16px; height: 16px; margin-right: 8px;"></span>{{/emoji.id}}
                        {{#emoji.name}}{{^emoji.id}}<span style="display: flex; align-items: center; margin-right: 8px;">{{emoji.name}}</span>{{/emoji.id}}{{/emoji.name}}
                        <span style="display: flex; align-items: center;">{{label}}</span>
                        {{#isLink}}
                        <span style="margin-left: 8px; display: flex; align-items: center;">
                            <svg role="img" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M15 2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V4.41l-4.3 4.3a1 1 0 1 1-1.4-1.42L19.58 3H16a1 1 0 0 1-1-1Z"/><path fill="currentColor" d="M5 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-6a1 1 0 1 0-2 0v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6a1 1 0 1 0 0-2H5Z"/></svg>
                        </span>
                        {{/isLink}}
                    </button>
                    {{/isButton}}
                    {{#isSelectMenu}}
                    <div class="discord-select-menu">
                        <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{placeholder}}</div>
                        <div style="display: flex; align-items: center; margin-left: 8px;">
                            <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 10L12 15L17 10H7Z" /></svg>
                        </div>
                    </div>
                    {{/isSelectMenu}}
                    {{/components}}
                </div>
                {{/components}}
                {{!-- Media Galleries --}}
                {{#mediaGalleries}}
                <div class="discord-media-gallery" style="grid-template-columns: repeat({{items.length}}, 1fr);">
                    {{#items}}
                    <div class="discord-base-image" style="aspect-ratio: 16/9;">
                        <img src="{{media.url}}" alt="{{description}}" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    {{/items}}
                </div>
                {{/mediaGalleries}}
                {{!-- Separators --}}
                {{#separators}}
                <div class="discord-separator" style="height: {{#divider}}1px{{/divider}}{{^divider}}0px{{/divider}}; margin: {{#isLarge}}8px 0{{/isLarge}}{{^isLarge}}0{{/isLarge}};"></div>
                {{/separators}}
                {{!-- Embeds --}}
                {{#embeds}}
                <div class="embed" {{#hexColor}}style="border-left-color: {{hexColor}};"{{/hexColor}}>
                    <div class="embed-content">
                        {{#author}}
                        <div class="embed-author">
                            {{#iconURL}}<img src="{{iconURL}}" class="embed-author-icon">{{/iconURL}}
                            {{#url}}<a href="{{url}}" target="_blank">{{name}}</a>{{/url}}
                            {{^url}}{{name}}{{/url}}
                        </div>
                        {{/author}}
                        {{#title}}
                        <div class="embed-title">
                             {{#url}}<a href="{{url}}" target="_blank">{{title}}</a>{{/url}}
                             {{^url}}{{title}}{{/url}}
                        </div>
                        {{/title}}
                        {{#description}}
                        <div class="embed-description">{{{description}}}</div>
                        {{/description}}
                        {{#fields.length}}
                        <div class="embed-fields">
                            {{#fields}}
                            <div class="embed-field">
                                <div class="embed-field-name">{{name}}</div>
                                <div class="embed-field-value">{{{value}}}</div>
                            </div>
                            {{/fields}}
                        </div>
                        {{/fields.length}}
                        
                         {{#image}}
                        <div class="embed-image-large">
                             <a href="{{url}}" transform="_blank"><img src="{{url}}"></a>
                        </div>
                        {{/image}}
                        {{#footer}}
                        <div class="embed-footer">
                            {{#iconURL}}<img src="{{iconURL}}" class="embed-footer-icon">{{/iconURL}}
                            <span>{{text}} {{#timestamp}}• {{timestamp}}{{/timestamp}}</span>
                        </div>
                        {{/footer}}
                    </div>
                </div>
                {{/embeds}}
            </div>
        </div>
        {{/messages}}
    </div>
</body>
</html>
`;
