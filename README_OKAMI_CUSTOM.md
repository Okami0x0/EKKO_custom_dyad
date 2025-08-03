# Okami Custom Dyad - Dyad Unlimited Enhanced Edition

This is a customized version of Dyad with enhanced AI rules and memory management capabilities. This repository is completely independent from the official Dyad project.

## 🚀 Enhanced Features

### AI Rules System
- **Custom AI Rules Templates**: Complete AI rules template system (`AI_RULES_TEMPLATE.md`)
- **Project-Specific Rules**: Support for per-project AI behavior customization
- **Design & Code Quality Rules**: Built-in rules for design patterns, code quality, performance, and security
- **Fallback System**: Graceful fallback to default rules when project-specific rules aren't available

### Advanced Memory Management
- **Smart Memory Management**: Configurable up to 150,000 tokens
- **Multiple Compression Levels**: Low, Medium, High compression options
- **Long-term Memory Retention**: 30-day conversation memory
- **Contextual Project Memory**: Project-aware memory with 50MB capacity
- **Auto-summarization**: Intelligent conversation summarization
- **Dynamic Context Windows**: Adaptive context window sizing based on memory settings

### Pro Features (Enabled by Default)
- **Unlimited Usage**: No usage restrictions
- **Advanced Chat Modes**: Full access to all chat modes
- **Enhanced Token Management**: Optimized token usage and context handling
- **Smart Context Auto-includes**: Intelligent context inclusion

## 🔧 Technical Enhancements

### Memory System Integration
- Enhanced `formatMessagesForSummary` function with dynamic message selection
- Improved token and context window calculations
- Better message history management with configurable limits
- Optimized conversation truncation with proportional message selection

### Settings & Configuration
- All enhanced features pre-enabled with optimal defaults
- 15-minute code backup intervals
- 100 undo operations
- Medium compression level
- 30-day memory retention
- Smart memory management enabled by default

## 📁 File Structure

Key enhanced files:
- `AI_RULES_TEMPLATE.md` - Comprehensive AI rules template
- `src/main/settings.ts` - Enhanced default settings
- `src/ipc/utils/token_utils.ts` - Improved token calculations
- `src/ipc/handlers/chat_stream_handlers.ts` - Enhanced memory integration

## 🛠️ Installation & Usage

1. Clone this repository
2. Install dependencies: `npm install`
3. Build the application: `npm run build`
4. Run the application: `npm start`

All enhanced features are enabled by default - no manual configuration required!

## 🔒 Privacy & Independence

This is a completely independent fork with no connections to the official Dyad repository. All enhancements are custom implementations designed for unlimited usage and advanced AI capabilities.

## 📝 Version History

- **Enhanced Memory Integration**: Dynamic message summarization based on memory settings
- **AI Rules System**: Complete custom AI rules template and project-specific rule support
- **Memory Management**: Advanced memory features with configurable retention and compression
- **Pro Features**: All premium features enabled by default

---

**Note**: This is a custom enhanced version of Dyad, not affiliated with the official Dyad project.
