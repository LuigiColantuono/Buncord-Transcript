
import mustache from 'mustache/mustache.js';
import { htmlTemplate, css } from './template';
import type { Message, TranscriptOptions, ChannelInfo, Embed, Button, SelectMenu } from './types';

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
            containers: msg.containers?.map(container => ({
                ...container,
                content: formatContent(container.content)
            })),
            // Map components (Action Rows -> Buttons & Select Menus)
            components: msg.components?.map(row => ({
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
            })),
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
