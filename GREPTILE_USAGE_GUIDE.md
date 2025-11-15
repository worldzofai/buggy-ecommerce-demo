# How to Use Greptile for AI Code Review Demo

## What is Greptile?

Greptile is an AI-powered code understanding and review tool that:
- Indexes your entire codebase
- Understands code context across files
- Provides intelligent code reviews
- Can be integrated into your development workflow

## How Greptile Works

### 1. **Repository Indexing**
Greptile first indexes your repository to understand:
- Code structure and relationships
- Dependencies and imports
- Function definitions and usage
- Data flow across files

### 2. **AI Analysis**
Once indexed, Greptile can:
- Answer questions about your codebase
- Identify security vulnerabilities
- Find bugs and logic errors
- Suggest improvements
- Review pull requests automatically

### 3. **Integration Options**

Greptile can work in several ways:

#### A. GitHub Integration (Automated PR Reviews)
- Install Greptile GitHub App
- It automatically reviews PRs and adds comments
- Identifies issues before code is merged
- **You don't need to create PRs yourself** - Greptile reviews PRs you or others create

#### B. API/SDK Integration
- Query your codebase programmatically
- Integrate into CI/CD pipelines
- Build custom code review workflows

#### C. Web Interface
- Ask questions about your code
- Get explanations and suggestions
- Manual code review assistance

## Demo Workflow Options

### Option 1: Automated PR Review (Recommended for Demos)

This is the most impressive demo approach:

1. **Install Greptile on Your Repo**
   ```bash
   # Go to: https://github.com/apps/greptile
   # Install on: worldzofai/buggy-ecommerce-demo
   ```

2. **Create a PR with Some Fixes**
   ```bash
   git checkout -b fix-sql-injection
   # Make some changes to fix issues
   git add .
   git commit -m "Fix SQL injection in login endpoint"
   git push origin fix-sql-injection
   ```

3. **Open PR on GitHub**
   - Greptile will automatically review it
   - It will comment on:
     - Issues you fixed (confirming the fix is correct)
     - Issues you missed
     - New issues you might have introduced
     - Code quality improvements

4. **Demo Points**
   - Show how Greptile catches issues automatically
   - Demonstrate context-aware suggestions
   - Highlight comprehensive vulnerability detection

### Option 2: Interactive Query Demo

Use Greptile's API or web interface to ask questions:

**Example Queries:**
```
"Find all SQL injection vulnerabilities in server.js"
"What security issues exist in the authentication flow?"
"Identify all memory leaks in the frontend code"
"How is user input sanitized before database queries?"
"What are the critical security vulnerabilities in this codebase?"
```

**Demo Flow:**
1. Visit Greptile web interface
2. Index your repository
3. Ask targeted questions
4. Show detailed, contextual responses
5. Demonstrate cross-file understanding

### Option 3: Side-by-Side Comparison

1. **Before Greptile:**
   - Show the buggy code
   - Reference ISSUES_REFERENCE.md
   - Explain how hard it is to find all issues manually

2. **With Greptile:**
   - Index the repository
   - Run automated analysis
   - Show how Greptile identifies issues with context
   - Compare findings with ISSUES_REFERENCE.md

3. **Demonstrate Value:**
   - Speed of detection
   - Accuracy of findings
   - Context awareness
   - Actionable suggestions

## Step-by-Step Setup for Demo

### 1. Set Up Greptile Account
```bash
# Visit: https://app.greptile.com
# Sign up with GitHub
# Grant repository access
```

### 2. Index Your Repository
```bash
# In Greptile dashboard:
# 1. Click "Add Repository"
# 2. Select: worldzofai/buggy-ecommerce-demo
# 3. Wait for indexing (1-5 minutes)
```

### 3. Choose Your Demo Path

#### Path A: Create a Test PR
```bash
cd buggy-ecommerce

# Create a branch to fix one issue
git checkout -b demo-fix-hardcoded-secrets

# Edit server.js to move secrets to env variables
# (Make partial fixes to show Greptile catching what you missed)

git add server.js
git commit -m "Move database credentials to environment variables"
git push origin demo-fix-hardcoded-secrets

# Open PR on GitHub
# Greptile will automatically review it
```

#### Path B: Use Query Interface
1. Go to Greptile web interface
2. Select your repository
3. Start asking questions about the code
4. Show intelligent, contextual responses

## Demo Script Example

### Introduction (2 minutes)
"Today I'm showing Greptile, an AI code reviewer. I've created a deliberately buggy e-commerce app with over 100 security and code quality issues."

### The Problem (3 minutes)
- Show [`server.js`](server.js) with SQL injection
- Show [`app.js`](public/app.js) with XSS vulnerabilities
- Explain: "Manual code review would take hours to catch all these"

### The Solution (10 minutes)

**Demo 1: Automated PR Review**
1. Show existing buggy code in main branch
2. Create PR with partial fixes
3. Show Greptile's automated review comments
4. Highlight:
   - Issues it caught that you fixed
   - Issues you missed that it found
   - Contextual explanations
   - Suggested fixes

**Demo 2: Interactive Queries**
1. Ask: "What are the critical security vulnerabilities?"
2. Show comprehensive response with file locations
3. Ask: "How should I fix the SQL injection in the login function?"
4. Show specific, actionable guidance
5. Ask: "Are there any memory leaks?"
6. Show it identifies intervals and event listeners

### The Value (2 minutes)
- Speed: Instant analysis vs hours of manual review
- Completeness: Found 106+ issues systematically
- Context: Understands code relationships
- Guidance: Provides fix suggestions

## Common Demo Questions & Answers

**Q: "Does Greptile automatically fix the code?"**
A: No, Greptile identifies issues and suggests fixes. You still need to implement the changes. It's like having an expert reviewer who comments on your PRs.

**Q: "Can it prevent bugs before they're committed?"**
A: Yes, when integrated into your workflow, Greptile can review PRs before merge, catching issues early.

**Q: "How does it compare to tools like SonarQube or CodeQL?"**
A: Greptile is AI-powered and understands context better. It can explain issues in natural language and provide more intelligent suggestions.

**Q: "Does it work with all languages?"**
A: Yes, Greptile supports all major programming languages.

## Tips for a Great Demo

1. **Start with Impact**
   - Show critical security vulnerabilities first
   - Demonstrate how Greptile catches them quickly

2. **Show Context Understanding**
   - Point out how Greptile traces data flow
   - Highlight cross-file analysis

3. **Be Interactive**
   - Take questions from audience
   - Ask Greptile live questions based on their interests

4. **Emphasize Time Savings**
   - 106+ issues found in minutes
   - Would take hours manually

5. **Show Real-World Application**
   - Explain how this prevents production bugs
   - Discuss cost of security vulnerabilities

## Resources

- **Greptile Docs**: https://www.greptile.com/docs
- **API Documentation**: https://www.greptile.com/docs/api
- **GitHub Integration**: https://github.com/apps/greptile
- **Your Demo Repo**: https://github.com/worldzofai/buggy-ecommerce-demo
- **Issues Reference**: [ISSUES_REFERENCE.md](ISSUES_REFERENCE.md)

## Next Steps After Demo

If audience is interested:
1. Share the GitHub repo link
2. Encourage them to try Greptile on their own code
3. Discuss integration with their workflow
4. Show pricing/plans if relevant

## Quick Commands Reference

```bash
# Clone the demo repo
git clone https://github.com/worldzofai/buggy-ecommerce-demo.git

# Create a demo fix branch
git checkout -b demo-fix

# Make some changes
# (Intentionally leave some issues unfixed)

# Push and create PR
git push origin demo-fix

# Greptile will automatically review the PR
```

## Troubleshooting

**Issue**: Greptile not commenting on PR
- Check Greptile GitHub App is installed
- Verify repository access permissions
- Ensure repository is indexed

**Issue**: Indexing taking too long
- Typical: 1-5 minutes for small repos
- Large repos may take longer
- Check Greptile dashboard for status

**Issue**: Missing expected issues
- Ensure full codebase is indexed
- Check if specific files are excluded
- Try re-indexing the repository