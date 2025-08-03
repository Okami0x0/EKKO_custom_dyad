# Security Guidelines for EKKO Custom Dyad

## 🔒 API Key and Sensitive Data Protection

This repository is configured to **never commit API keys, tokens, or sensitive data** to version control. Follow these guidelines to keep your data secure:

### ✅ What's Protected

The `.gitignore` file automatically excludes:
- **Environment files**: `.env*` (except templates)
- **Database files**: `*.db`, `*.sqlite*`
- **Credentials**: `*token*`, `*secret*`, `*key*`
- **User data**: `userData/`, `settings.json`
- **Certificates**: `*.pem`, `*.key`, `*.crt`

### 🚀 Setup Your Environment

1. **Copy the template**:
   ```bash
   cp .env.example .env
   ```

2. **Fill in your API keys** in `.env`:
   ```env
   GITHUB_CLIENT_ID=your_actual_client_id
   OPENAI_API_KEY=your_actual_openai_key
   # ... etc
   ```

3. **Never commit `.env`** - it's automatically ignored!

### 🛡️ Best Practices

#### For Developers:
- ✅ Use environment variables for all sensitive data
- ✅ Use `.env.example` to document required variables
- ✅ Rotate API keys regularly
- ✅ Use least-privilege access tokens
- ❌ Never hardcode API keys in source code
- ❌ Never commit `.env` files

#### For Contributors:
- Check `.gitignore` before committing
- Use `git status` to verify no sensitive files are staged
- Report any exposed credentials immediately

### 🔍 Checking for Exposed Secrets

Before pushing to GitHub:

```bash
# Check what files will be committed
git status

# Verify no sensitive data in staged files
git diff --cached

# Search for potential secrets (optional)
grep -r "api.*key\|secret\|token" src/ --exclude-dir=node_modules
```

### 🚨 If You Accidentally Commit Secrets

1. **Immediately rotate** the exposed credentials
2. **Remove from Git history**:
   ```bash
   git filter-branch --force --index-filter \
   'git rm --cached --ignore-unmatch path/to/sensitive/file' \
   --prune-empty --tag-name-filter cat -- --all
   ```
3. **Force push** to update remote repository
4. **Notify team members** to re-clone the repository

### 📋 Environment Variables Reference

See `.env.example` for a complete list of required environment variables.

#### Required for Basic Functionality:
- `GITHUB_CLIENT_ID` - GitHub OAuth app client ID
- `OPENAI_API_KEY` - OpenAI API access key

#### Optional for Extended Features:
- `ANTHROPIC_API_KEY` - Claude AI access
- `GOOGLE_API_KEY` - Google AI/Gemini access
- `VERCEL_ACCESS_TOKEN` - Deployment integration
- `SUPABASE_URL` & `SUPABASE_SERVICE_ROLE_KEY` - Database integration

---

**Remember**: Security is everyone's responsibility. When in doubt, ask before committing!
