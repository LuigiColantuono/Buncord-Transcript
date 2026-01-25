
import mustache from 'mustache/mustache.js';
import { htmlTemplate, css } from './template';
import type { Message, TranscriptOptions, ChannelInfo, Embed, Button, SelectMenu, AnyComponent, ContainerComponent, TextDisplayComponent, SeparatorComponent, ActionRow } from './types';

// Helper to format Date
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

// Simple Markdown Formatter (Zero-dependency)
function formatContent(content: string): string {
    if (!content) return '';

    let html = content
        // Escape HTML first (Critical since we turned off auto-escaping in mustache?)
        // Wait, user explicitly asked for NO escaping in mustache for performance/control.
        // But we DO need to escape user content to prevent XSS if this was public, 
        // but for a transcript strictly viewing, we usually want to render HTML if it WAS HTML.
        // However, Discord messages are text. We should escape < and > unless we are inserting our own tags.
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        
        // Code Blocks (multiline)
        .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
        // Code Blocks (simple)
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        
        // Inline Code
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        
        // Links [text](url)
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')

        // Bold
        .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
        
        // Italic
        .replace(/\*([^*]+)\*/g, '<i>$1</i>')
        .replace(/_([^_]+)_/g, '<i>$1</i>')
        
        // Underline
        .replace(/__([^_]+)__/g, '<u>$1</u>')
        
        // Strikethrough
        .replace(/~~([^~]+)~~/g, '<s>$1</s>')
        
        // Newlines
        .replace(/\n/g, '<br>');

    // Mentions (User) <@123456>
    html = html.replace(/&lt;@!?(\d+)&gt;/g, '<span class="mention">@User</span>');
    // Mentions (Channel) <#123456>
    html = html.replace(/&lt;#(\d+)&gt;/g, '<span class="mention">#Channel</span>');
    // Mentions (Role) <@&123456>
    html = html.replace(/&lt;@&(\d+)&gt;/g, '<span class="mention">@Role</span>');

    return html;
}

// Helper to render V2 Components to HTML string
function renderComponent(component: AnyComponent): string {
    if (component.type === 17) { // Container
        const container = component as ContainerComponent;
        const children = container.components.map(c => renderComponent(c)).join('');
        return `<div class="discord-container">${children}</div>`;
    }

    if (component.type === 10) { // Text Display
        const text = component as TextDisplayComponent;
        const content = formatContent(text.content);
        return `<div class="discord-section"><div class="discord-section-content">${content}</div></div>`;
    }

    if (component.type === 14) { // Separator
        const sep = component as SeparatorComponent;
        const style = sep.divider ? 'height: 1px;' : 'height: 0px;';
        const margin = sep.spacing === 3 ? 'margin: 8px 0;' : sep.spacing === 2 ? 'margin: 4px 0;' : 'margin: 0;';
        return `<div class="discord-separator" style="${style} ${margin}"></div>`;
    }

    if (component.type === 1) { // Action Row
        const row = component as ActionRow;
        const children = row.components.map(c => renderComponent(c)).join('');
        return `<div class="message-component-group">${children}</div>`;
    }

    if (component.type === 2) { // Button
        const btn = component as Button;
        const styleClass = btn.style === 1 ? 'primary' :
                          btn.style === 2 ? 'secondary' :
                          btn.style === 3 ? 'success' :
                          btn.style === 4 ? 'destructive' : 
                          btn.style === 5 ? 'secondary' : 'primary'; // Link usually secondary look or special
        
        let content = '';
        if (btn.emoji) {
             if (btn.emoji.id) {
                 content += `<span style="display: flex; align-items: center;"><img src="https://cdn.discordapp.com/emojis/${btn.emoji.id}.webp?size=44&quality=lossless" alt="${btn.emoji.name}" style="width: 16px; height: 16px; margin-right: 8px;"></span>`;
             } else if (btn.emoji.name) {
                 content += `<span style="display: flex; align-items: center; margin-right: 8px;">${btn.emoji.name}</span>`;
             }
        }
        if (btn.label) {
            content += `<span style="display: flex; align-items: center;">${btn.label}</span>`;
        }
        if (btn.style === 5) { // Link icon
             content += `<span style="margin-left: 8px; display: flex; align-items: center;"><svg role="img" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M15 2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V4.41l-4.3 4.3a1 1 0 1 1-1.4-1.42L19.58 3H16a1 1 0 0 1-1-1Z"/><path fill="currentColor" d="M5 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-6a1 1 0 1 0-2 0v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6a1 1 0 1 0 0-2H5Z"/></svg></span>`;
        } // Link logic

        const disabledAttr = btn.disabled ? 'disabled' : '';
        const href = btn.url ? `href="${btn.url}" target="_blank"` : ''; // Use <a> for links if preferred, but existing template used <button>. Let's stick to button or <a> styled as button.
        // Actually, for link buttons, <a> is better, but consistency with template...
        // The template uses <button> even for links?
        // Line 493 of template: <button ...>
        // But for link buttons (style 5), they act as links.
        // If I use <button> I can't easily click it unless I use JS or window.open.
        // But this is a static transcript!
        // The original template had logic for {{#isLink}} but it just added an icon, it didn't change the tag to <a>.
        // Wait, line 493 in template: `<button ... type="button" ...>`
        // If it's a link button, it should really be an <a> tag.
        // However, I will match the requested "Visual Glitches" fix first.
        // But if I'm rewriting the renderer, I can do it RIGHT.
        // I'll make it an <a> tag if it has a URL.
        
        if (btn.style === 5 && btn.url) {
             return `<a class="discord-button discord-button-secondary" href="${btn.url}" target="_blank" ${disabledAttr}>${content}</a>`;
        }

        return `<button class="discord-button discord-button-${styleClass}" type="button" ${disabledAttr}>${content}</button>`;
    }
    
    if (component.type === 3 || component.type === 5 || component.type === 6 || component.type === 7 || component.type === 8) { // Select Menu
        const menu = component as SelectMenu;
        return `<div class="discord-select-menu">
            <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${menu.placeholder || 'Select...'}</div>
            <div style="display: flex; align-items: center; margin-left: 8px;">
                <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 10L12 15L17 10H7Z" /></svg>
            </div>
        </div>`;
    }

    return '';
}

export async function generateTranscript(messages: Message[], channel: ChannelInfo, options: TranscriptOptions = {}) {
    // Reverse messages if needed (assuming incoming is generic order, usually we want oldest first for chat log)
    // But usually Discord API returns newest first or we have them in array. 
    // Let's assume the caller passes them in the order they want them displayed.
    
    const processedMessages = messages.map(msg => {
        return {
            ...msg,
            timestamp: formatDate(msg.timestamp),
            content: formatContent(msg.content),
            // Process embeds to add color hex and large image logic
            embeds: msg.embeds?.map(embed => ({
                ...embed,
                description: embed.description ? formatContent(embed.description) : undefined,
                fields: embed.fields?.map(field => ({
                    ...field,
                    value: formatContent(field.value)
                })),
                hexColor: embed.color ? '#' + embed.color.toString(16).padStart(6, '0') : undefined,
            })),
            // Process containers (V2)
            containers: [
                ...(msg.containers?.map(container => ({
                    ...container,
                    content: formatContent(container.content)
                })) || []),
                ...(msg.components?.filter(c => c.type === 17).map(container => ({
                    content: renderComponent(container)
                })) || [])
            ],
            // Map components (Action Rows -> Buttons & Select Menus)
            components: msg.components?.filter(c => c.type === 1).map(c => {
                const row = c as ActionRow;
                return {
                    ...row,
                    components: row.components.map(component => {
                        if (component.type === 2) { // Button
                            const btn = component as Button;
                            return {
                                ...btn,
                                isButton: true,
                                styleClass: btn.style === 1 ? 'primary' :
                                            btn.style === 2 ? 'secondary' :
                                            btn.style === 3 ? 'success' :
                                            btn.style === 4 ? 'destructive' : 
                                            btn.style === 5 ? 'secondary' : 'primary',
                                isLink: btn.style === 5,
                                emoji: btn.emoji
                            };
                        } else { // SelectMenu
                            return {
                                ...component,
                                isSelectMenu: true
                            };
                        }
                    })
                };
            }),
            // Map V2 components
            mediaGalleries: msg.mediaGalleries,
            separators: msg.separators?.map(sep => ({
                ...sep,
                isLarge: sep.spacing === 3 // Assuming 3 is Large
            })),
            // Handle reply snippet
            replyTo: msg.replyTo ? {
                ...msg.replyTo,
                contentSnippet: msg.replyTo.content.substring(0, 50) + (msg.replyTo.content.length > 50 ? '...' : '')
            } : undefined
        };
    });

    const view = {
        channel,
        messages: processedMessages,
        css
    };

    // Render using the custom mustache fork
    // casting to any because of the custom fork import might have slightly different types
    const output = (mustache as any).render(htmlTemplate, view);

    if (options.returnType === 'buffer') {
        return Buffer.from(output);
    }

    return output;
}
