#!/usr/bin/env node

/**
 * Security Check Script for EKKO Custom Dyad
 * 
 * This script scans the repository for potential security issues:
 * - API keys in source code
 * - Unignored sensitive files
 * - Database files in version control
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔒 EKKO Custom Dyad - Security Check');
console.log('=====================================\n');

let hasIssues = false;

// Check 1: Look for potential API keys in source files
console.log('📋 Checking for potential API keys in source code...');
try {
  const result = execSync('git ls-files | xargs grep -l "api.*key\\|secret\\|token\\|password" 2>/dev/null || true', 
    { encoding: 'utf8' });
  
  if (result.trim()) {
    const files = result.trim().split('\n').filter(file => 
      // Exclude known safe files
      !file.includes('test') && 
      !file.includes('spec') && 
      !file.includes('.md') &&
      !file.includes('security-check.js') &&
      !file.includes('.example') &&
      !file.includes('SECURITY.md')
    );
    
    if (files.length > 0) {
      console.log('⚠️  Found potential API keys in:');
      files.forEach(file => console.log(`   - ${file}`));
      console.log('💡 Review these files to ensure no real credentials are present.\n');
      hasIssues = true;
    } else {
      console.log('✅ No suspicious API key patterns found in source code.\n');
    }
  } else {
    console.log('✅ No suspicious API key patterns found in source code.\n');
  }
} catch (error) {
  console.log('⚠️  Could not check for API keys (this might be okay).\n');
}

// Check 2: Look for .env files in version control
console.log('📋 Checking for .env files in version control...');
try {
  const result = execSync('git ls-files | grep -E "\\.env$|\\.env\\." | grep -v "\\.env\\.example$" || true', 
    { encoding: 'utf8' });
  
  if (result.trim()) {
    console.log('❌ Found .env files in version control:');
    result.trim().split('\n').forEach(file => console.log(`   - ${file}`));
    console.log('🚨 These should be removed immediately!\n');
    hasIssues = true;
  } else {
    console.log('✅ No .env files found in version control.\n');
  }
} catch (error) {
  console.log('⚠️  Could not check for .env files.\n');
}

// Check 3: Look for database files in version control
console.log('📋 Checking for database files in version control...');
try {
  const result = execSync('git ls-files | grep -E "\\.(db|sqlite|sqlite3)$" || true', 
    { encoding: 'utf8' });
  
  if (result.trim()) {
    console.log('⚠️  Found database files in version control:');
    result.trim().split('\n').forEach(file => console.log(`   - ${file}`));
    console.log('💡 Consider if these contain sensitive data.\n');
    hasIssues = true;
  } else {
    console.log('✅ No database files found in version control.\n');
  }
} catch (error) {
  console.log('⚠️  Could not check for database files.\n');
}

// Check 4: Verify .gitignore exists and has security rules
console.log('📋 Checking .gitignore security configuration...');
if (fs.existsSync('.gitignore')) {
  const gitignore = fs.readFileSync('.gitignore', 'utf8');
  const hasSecuritySection = gitignore.includes('SECURITY: API Keys and Sensitive Data');
  const hasEnvIgnore = gitignore.includes('.env');
  
  if (hasSecuritySection && hasEnvIgnore) {
    console.log('✅ .gitignore has proper security configuration.\n');
  } else {
    console.log('⚠️  .gitignore might need security improvements.');
    if (!hasEnvIgnore) console.log('   - Missing .env exclusion');
    if (!hasSecuritySection) console.log('   - Missing security section');
    console.log('');
    hasIssues = true;
  }
} else {
  console.log('❌ .gitignore file not found!\n');
  hasIssues = true;
}

// Check 5: Verify .env.example exists
console.log('📋 Checking for .env.example template...');
if (fs.existsSync('.env.example')) {
  console.log('✅ .env.example template found.\n');
} else {
  console.log('⚠️  .env.example template not found. Consider creating one.\n');
}

// Summary
console.log('=====================================');
if (hasIssues) {
  console.log('❌ Security issues found! Please review the above warnings.');
  console.log('📖 See SECURITY.md for detailed guidelines.');
  process.exit(1);
} else {
  console.log('✅ No major security issues detected!');
  console.log('🛡️  Your repository appears to be properly secured.');
  console.log('📖 Continue following the guidelines in SECURITY.md');
}
