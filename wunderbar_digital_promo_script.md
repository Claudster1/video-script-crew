<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Video Script Generator</title>
    <!-- Dependencies -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/docx/7.8.2/docx.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>
    <style>
        /* Base styles */
        :root {
            --primary-color: #000000;
            --secondary-color: #86868b;
            --accent-color: #0066cc;
            --background-color: #ffffff;
            --surface-color: #f5f5f7;
            --text-color: #1d1d1f;
            --border-radius: 12px;
            --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            
            /* Typography */
            --font-family-base: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
            --font-family-heading: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
            --font-size-base: 16px;
            --font-size-sm: 14px;
            --font-size-lg: 18px;
            --font-size-xl: 24px;
            --font-size-2xl: 32px;
            --font-size-3xl: 40px;
            --line-height-tight: 1.2;
            --line-height-normal: 1.5;
            --font-weight-normal: 400;
            --font-weight-medium: 500;
            --font-weight-semibold: 600;
            --font-weight-bold: 700;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: var(--font-family-base);
            font-size: var(--font-size-base);
            line-height: var(--line-height-normal);
            color: var(--text-color);
            background: var(--background-color);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
        }

        /* Header styles */
        .app-header {
            text-align: center;
            margin-bottom: 60px;
        }

        .logo-container {
            display: inline-flex;
            align-items: center;
            gap: 24px;
            margin-bottom: 32px;
        }

        .logo {
            width: 64px;
            height: 64px;
            transition: var(--transition);
            color: var(--text-color);
        }

        .logo:hover {
            transform: scale(1.05);
            color: var(--accent-color);
        }

        .logo-text {
            font-size: var(--font-size-3xl);
            font-weight: var(--font-weight-bold);
            letter-spacing: -0.5px;
            line-height: var(--line-height-tight);
        }

        .logo-subtitle {
            font-size: var(--font-size-lg);
            font-weight: var(--font-weight-normal);
            color: var(--secondary-color);
            margin-top: 8px;
        }

        /* Tab Navigation */
        .tab-navigation {
            position: sticky;
            top: 0;
            background: var(--background-color);
            z-index: 100;
            padding: 16px 0;
            margin-bottom: 32px;
            border-bottom: 1px solid #d2d2d7;
        }

        .tab-button {
            position: relative;
            padding: 12px 24px;
            background: var(--surface-color);
            border: none;
            border-radius: var(--border-radius) var(--border-radius) 0 0;
            font-size: var(--font-size-base);
            font-weight: var(--font-weight-medium);
            color: var(--secondary-color);
            cursor: pointer;
            transition: var(--transition);
        }

        .tab-button:hover {
            color: var(--text-color);
            background: var(--background-color);
        }

        .tab-button.active {
            color: var(--accent-color);
            background: var(--background-color);
        }

        .tab-button.active::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            right: 0;
            height: 2px;
            background: var(--accent-color);
        }

        .tab-button.completed {
            color: var(--accent-color);
        }

        .tab-button.completed::before {
            content: '✓';
            margin-right: 8px;
            font-size: 14px;
        }

        .tab-content {
            display: none;
        }

        .tab-content.active {
            display: block;
        }

        /* Form Sections */
        .form-section {
            background: var(--surface-color);
            border-radius: var(--border-radius);
            padding: 48px;
            margin-bottom: 32px;
            transition: var(--transition);
        }

        .form-section:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow);
        }

        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
        }

        .section-title {
            font-size: var(--font-size-2xl);
            font-weight: var(--font-weight-semibold);
            letter-spacing: -0.3px;
            line-height: var(--line-height-tight);
            margin-bottom: 12px;
            color: var(--text-color);
        }

        .section-description {
            font-size: var(--font-size-lg);
            color: var(--secondary-color);
            margin-bottom: 32px;
            line-height: var(--line-height-normal);
        }

        /* Advanced Options */
        .advanced-section {
            background: var(--background-color);
            border-radius: var(--border-radius);
            padding: 24px;
            margin-top: 24px;
        }

        .advanced-toggle {
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--accent-color);
            cursor: pointer;
            font-size: 15px;
            font-weight: 500;
        }

        .advanced-toggle svg {
            width: 16px;
            height: 16px;
            transition: transform 0.3s ease;
        }

        .advanced-toggle.expanded svg {
            transform: rotate(180deg);
        }

        /* Progress Indicator */
        .progress-indicator {
            display: flex;
            justify-content: space-between;
            margin-bottom: 32px;
            position: relative;
        }

        .progress-step {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            position: relative;
            z-index: 1;
        }

        .step-number {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: var(--surface-color);
            border: 2px solid #d2d2d7;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: var(--font-size-base);
            font-weight: var(--font-weight-semibold);
            color: var(--secondary-color);
            transition: var(--transition);
        }

        .step-label {
            font-size: var(--font-size-base);
            font-weight: var(--font-weight-medium);
            text-align: center;
        }

        .progress-line {
            position: absolute;
            top: 16px;
            left: 0;
            right: 0;
            height: 2px;
            background: #d2d2d7;
            z-index: 0;
        }

        .progress-step.active .step-number {
            background: var(--accent-color);
            border-color: var(--accent-color);
            color: white;
        }

        .progress-step.completed .step-number {
            background: var(--accent-color);
            border-color: var(--accent-color);
            color: white;
        }

        .progress-step.active .step-label {
            color: var(--accent-color);
        }

        /* Navigation Buttons */
        .form-navigation {
            display: flex;
            justify-content: space-between;
            margin-top: 40px;
            padding-top: 24px;
            border-top: 1px solid #d2d2d7;
        }

        .nav-button {
            padding: 16px 32px;
            font-size: var(--font-size-lg);
            font-weight: var(--font-weight-medium);
            border-radius: var(--border-radius);
            border: none;
            cursor: pointer;
            transition: var(--transition);
        }

        .nav-button.secondary {
            background: var(--surface-color);
            color: var(--text-color);
        }

        .nav-button.primary {
            background: var(--accent-color);
            color: white;
        }

        .nav-button:hover {
            transform: translateY(-1px);
            box-shadow: var(--shadow);
        }

        .nav-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }

        /* Upload area */
        .upload-area {
            position: relative;
            padding: 48px;
            border: 2px dashed #d2d2d7;
            min-height: 200px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transition: var(--transition);
            background: var(--background-color);
        }

        .upload-area:hover {
            border-color: var(--accent-color);
            background: rgba(0, 102, 204, 0.02);
        }

        .upload-area.dragover {
            border-color: var(--accent-color);
            background: rgba(0, 102, 204, 0.05);
        }

        .upload-icon {
            width: 64px;
            height: 64px;
            margin-bottom: 24px;
            fill: var(--secondary-color);
            transition: var(--transition);
        }

        .upload-area:hover .upload-icon {
            fill: var(--accent-color);
            transform: scale(1.1);
        }

        .upload-prompt {
            margin-bottom: 16px;
        }

        .upload-prompt p {
            margin: 12px 0;
            font-size: var(--font-size-lg);
            color: var(--text-color);
        }

        .upload-hint {
            font-size: var(--font-size-base);
            margin-top: 16px;
        }

        .uploaded-files {
            margin-top: 24px;
            text-align: left;
        }

        .file-item {
            display: flex;
            align-items: flex-start;
            padding: 12px;
            background: var(--surface-color);
            border-radius: var(--border-radius);
            margin-bottom: 8px;
        }

        .file-icon {
            width: 24px;
            height: 24px;
            margin-right: 12px;
            fill: var(--secondary-color);
        }

        .file-info {
            flex: 1;
            margin-right: 12px;
        }

        .file-name {
            font-size: var(--font-size-base);
            font-weight: var(--font-weight-medium);
            margin-bottom: 4px;
        }

        .file-size {
            font-size: var(--font-size-sm);
            color: var(--secondary-color);
        }

        .file-remove {
            padding: 4px 8px;
            background: none;
            border: none;
            color: var(--secondary-color);
            cursor: pointer;
            transition: var(--transition);
        }

        .file-remove:hover {
            color: #ff3b30;
        }

        /* Keyword tags */
        .keyword-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 12px;
        }

        .keyword-tag {
            padding: 6px 12px;
            background: var(--background-color);
            border: 1px solid #d2d2d7;
            border-radius: 16px;
            font-size: 14px;
            color: var(--text-color);
            cursor: pointer;
            transition: var(--transition);
        }

        .keyword-tag:hover {
            background: var(--accent-color);
            color: white;
            border-color: var(--accent-color);
        }

        /* Preview panel */
        .preview-panel {
            background: var(--surface-color);
            border-radius: var(--border-radius);
            padding: 32px;
            margin-top: 32px;
        }

        .preview-controls {
            display: flex;
            gap: 12px;
            margin-bottom: 24px;
        }

        .preview-option {
            padding: 8px 16px;
            border-radius: 8px;
            cursor: pointer;
            transition: var(--transition);
            background: var(--background-color);
            color: var(--secondary-color);
        }

        .preview-option.active {
            background: var(--accent-color);
            color: white;
        }

        /* Timeline visualization */
        .timeline-visualization {
            height: 120px;
            background: var(--background-color);
            border-radius: var(--border-radius);
            margin: 24px 0;
            position: relative;
            overflow: hidden;
        }

        .timeline-segment {
            position: absolute;
            height: 100%;
            background: var(--accent-color);
            transition: var(--transition);
        }

        .timeline-label {
            position: absolute;
            color: white;
            font-size: 14px;
            padding: 8px 12px;
            background: rgba(0, 0, 0, 0.6);
            border-radius: 6px;
            pointer-events: none;
        }

        /* Export options */
        .export-options {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 16px;
            margin-top: 24px;
        }

        .export-option {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            padding: 16px;
            background: var(--surface-color);
            border-radius: var(--border-radius);
            cursor: pointer;
            transition: var(--transition);
        }

        .export-option:hover {
            background: var(--accent-color);
            color: white;
            transform: translateY(-2px);
            box-shadow: var(--shadow);
        }

        .export-option svg {
            width: 24px;
            height: 24px;
        }

        /* Status messages */
        .status-message {
            font-size: var(--font-size-base);
            padding: 16px;
            border-radius: var(--border-radius);
            margin-top: 16px;
        }

        .status-message.success {
            background: #e8f5e9;
            color: #2e7d32;
            display: block;
        }

        .status-message.error {
            background: #ffebee;
            color: #c62828;
            display: block;
        }

        .status-message.loading {
            background: #e3f2fd;
            color: #1565c0;
            display: block;
        }

        /* Responsive design */
        @media (max-width: 768px) {
            .container {
                padding: 20px;
            }

            .form-section {
                padding: 24px;
            }

            .logo-container {
                flex-direction: column;
                gap: 16px;
            }

            .export-options {
                grid-template-columns: 1fr;
            }
        }

        /* New Features */
        .template-gallery {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 24px;
            margin: 24px 0;
        }

        .template-card {
            background: var(--surface-color);
            border-radius: var(--border-radius);
            padding: 24px;
            cursor: pointer;
            transition: var(--transition);
        }

        .template-card:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow);
        }

        .template-card h3 {
            margin: 0 0 12px 0;
            font-size: 18px;
            font-weight: 600;
        }

        .template-card p {
            margin: 0;
            color: var(--secondary-color);
            font-size: 14px;
        }

        .script-preview {
            background: var(--surface-color);
            border-radius: var(--border-radius);
            padding: 24px;
            margin: 24px 0;
            font-family: 'SF Mono', monospace;
            white-space: pre-wrap;
        }

        .tone-variations {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
            margin: 16px 0;
        }

        .tone-card {
            background: var(--surface-color);
            border: 1px solid #d2d2d7;
            border-radius: var(--border-radius);
            padding: 16px;
            cursor: pointer;
            transition: var(--transition);
        }

        .tone-card:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow);
            border-color: var(--accent-color);
        }

        .tone-card.active {
            background: var(--accent-color);
            color: white;
            border-color: var(--accent-color);
        }

        .tone-card h4 {
            margin: 0 0 8px 0;
            font-size: 16px;
            font-weight: 600;
        }

        .tone-card p {
            margin: 0;
            font-size: 14px;
            opacity: 0.8;
        }

        /* Add these new styles */
        .option-cards, .style-variations {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 24px;
            margin: 24px 0;
        }

        .option-card, .style-card {
            background: var(--surface-color);
            border: 1px solid #d2d2d7;
            border-radius: var(--border-radius);
            padding: 24px;
            cursor: pointer;
            transition: var(--transition);
        }

        .option-card:hover, .style-card:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow);
            border-color: var(--accent-color);
        }

        .option-card.active, .style-card.active {
            background: var(--accent-color);
            color: white;
            border-color: var(--accent-color);
        }

        .option-card h4, .style-card h4 {
            margin: 0 0 8px 0;
            font-size: var(--font-size-lg);
            font-weight: var(--font-weight-semibold);
        }

        .option-card p, .style-card p {
            margin: 0;
            font-size: var(--font-size-base);
            line-height: var(--line-height-normal);
        }

        .option-card small, .style-card small {
            display: block;
            margin-top: 8px;
            font-size: var(--font-size-sm);
            opacity: 0.8;
        }

        /* Add these new input styles */
        .input-wrapper {
            position: relative;
            margin-bottom: 32px;
        }

        .input-wrapper label {
            display: block;
            margin-bottom: 12px;
            font-size: var(--font-size-lg);
            font-weight: var(--font-weight-medium);
            color: var(--text-color);
        }

        .input-wrapper input {
            width: 100%;
            padding: 20px;
            font-size: var(--font-size-lg);
            background: var(--background-color);
            border: 2px solid #d2d2d7;
            border-radius: var(--border-radius);
            transition: var(--transition);
            color: var(--text-color);
            min-height: 60px;
        }

        .input-wrapper input:hover {
            border-color: var(--accent-color);
            background: rgba(0, 102, 204, 0.02);
        }

        .input-wrapper input:focus {
            outline: none;
            border-color: var(--accent-color);
            box-shadow: 0 0 0 4px rgba(0, 102, 204, 0.1);
            background: var(--background-color);
        }

        .input-wrapper input::placeholder {
            color: var(--secondary-color);
            opacity: 0.7;
            font-size: var(--font-size-lg);
        }

        .url-input-wrapper {
            position: relative;
        }

        .url-input-wrapper::before {
            content: 'https://';
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--secondary-color);
            font-size: var(--font-size-lg);
            pointer-events: none;
            font-weight: var(--font-weight-medium);
        }

        .url-input-wrapper input {
            padding-left: 100px;
        }

        .helper-text {
            display: block;
            margin-top: 12px;
            font-size: var(--font-size-base);
            color: var(--secondary-color);
            line-height: 1.4;
        }

        /* Update number input styles */
        input[type="number"] {
            -moz-appearance: textfield;
            appearance: textfield;
        }

        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        /* Update form group spacing */
        .form-group {
            margin-bottom: 40px;
        }

        .form-group:last-child {
            margin-bottom: 0;
        }

        /* Update required field indicator */
        .required {
            color: var(--accent-color);
            margin-left: 4px;
            font-weight: var(--font-weight-medium);
        }

        /* Add image preview styles */
        .file-preview {
            margin-top: 12px;
            max-width: 200px;
            border-radius: var(--border-radius);
            overflow: hidden;
            background: var(--background-color);
        }

        .file-preview img {
            width: 100%;
            height: auto;
            display: block;
        }

        .file-preview svg {
            width: 100%;
            height: auto;
            display: block;
        }

        /* Standardize header styles */
        .section-title {
            font-size: var(--font-size-2xl);
            font-weight: var(--font-weight-semibold);
            letter-spacing: -0.3px;
            line-height: var(--line-height-tight);
            margin-bottom: 12px;
            color: var(--text-color);
        }

        .section-description {
            font-size: var(--font-size-lg);
            color: var(--secondary-color);
            margin-bottom: 32px;
            line-height: var(--line-height-normal);
        }

        /* Update option cards */
        .option-cards, .style-variations, .tone-variations {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 24px;
            margin: 24px 0;
        }

        .option-card, .style-card, .tone-card {
            background: var(--surface-color);
            border: 2px solid #d2d2d7;
            border-radius: var(--border-radius);
            padding: 32px;
            cursor: pointer;
            transition: var(--transition);
            position: relative;
            overflow: hidden;
        }

        .option-card:hover, .style-card:hover, .tone-card:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow);
            border-color: var(--accent-color);
            background: rgba(0, 102, 204, 0.02);
        }

        .option-card.active, .style-card.active, .tone-card.active {
            background: var(--accent-color);
            color: white;
            border-color: var(--accent-color);
        }

        .option-card h4, .style-card h4, .tone-card h4 {
            margin: 0 0 12px 0;
            font-size: var(--font-size-xl);
            font-weight: var(--font-weight-semibold);
            color: inherit;
        }

        .option-card p, .style-card p, .tone-card p {
            margin: 0;
            font-size: var(--font-size-lg);
            line-height: var(--line-height-normal);
            color: inherit;
            opacity: 0.9;
        }

        .option-card small, .style-card small, .tone-card small {
            display: block;
            margin-top: 16px;
            font-size: var(--font-size-base);
            opacity: 0.8;
            color: inherit;
        }

        .option-card.active p, .style-card.active p, .tone-card.active p,
        .option-card.active small, .style-card.active small, .tone-card.active small {
            opacity: 1;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="app-header">
            <div class="logo-container">
                <svg class="logo" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <!-- Film Strip Design -->
                    <rect x="20" y="20" width="60" height="60" rx="8" fill="none" stroke="currentColor" stroke-width="2"/>
                    
                    <!-- Film Perforations -->
                    <rect x="15" y="30" width="5" height="10" rx="2" fill="currentColor"/>
                    <rect x="15" y="50" width="5" height="10" rx="2" fill="currentColor"/>
                    <rect x="80" y="30" width="5" height="10" rx="2" fill="currentColor"/>
                    <rect x="80" y="50" width="5" height="10" rx="2" fill="currentColor"/>
                    
                    <!-- Play Button -->
                    <path d="M40,35 L65,50 L40,65 Z" fill="currentColor"/>
                    
                    <!-- Script Lines -->
                    <line x1="30" y1="70" x2="70" y2="70" stroke="currentColor" stroke-width="1"/>
                    <line x1="30" y1="75" x2="60" y2="75" stroke="currentColor" stroke-width="1"/>
                    <line x1="30" y1="80" x2="65" y2="80" stroke="currentColor" stroke-width="1"/>
                </svg>
                <div>
                    <h1 class="logo-text">Video Script Generator</h1>
                    <p class="logo-subtitle">Craft compelling stories with precision</p>
                </div>
            </div>
        </div>

        <div class="progress-indicator">
            <div class="progress-line"></div>
            <div class="progress-step active" data-step="1">
                <div class="step-number">1</div>
                <div class="step-label">Project Details</div>
            </div>
            <div class="progress-step" data-step="2">
                <div class="step-number">2</div>
                <div class="step-label">Content & Branding</div>
            </div>
            <div class="progress-step" data-step="3">
                <div class="step-number">3</div>
                <div class="step-label">Script Style</div>
            </div>
            <div class="progress-step" data-step="4">
                <div class="step-number">4</div>
                <div class="step-label">Preview & Export</div>
            </div>
        </div>

        <form id="videoScriptForm">
            <div class="tab-navigation">
                <button type="button" class="tab-button active" data-tab="project-details">Project Details</button>
                <button type="button" class="tab-button" data-tab="content-branding">Content & Branding</button>
                <button type="button" class="tab-button" data-tab="script-style">Script Style</button>
                <button type="button" class="tab-button" data-tab="preview-export">Preview & Export</button>
            </div>

            <div id="project-details" class="tab-content active">
                <div class="form-section">
                    <div class="section-header">
                        <div>
                            <h2 class="section-title">Project Overview</h2>
                            <p class="section-description">Start by defining your project's basic information</p>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="contentUpload">Upload Content</label>
                        <div class="upload-area" id="uploadArea">
                            <input type="file" id="contentUpload" accept=".txt,.doc,.docx,.pdf,.html" multiple hidden>
                            <div class="upload-prompt">
                                <svg class="upload-icon" viewBox="0 0 24 24" width="48" height="48">
                                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                                </svg>
                                <p>Drag & drop files here or click to upload</p>
                                <p class="upload-hint">Supported formats: TXT, DOC, DOCX, PDF, HTML</p>
                            </div>
                            <div class="uploaded-files" id="uploadedFiles"></div>
                        </div>
                        <small class="helper-text">Upload company documents, website content, or marketing materials to help generate the script</small>
                    </div>
                    <div class="form-group">
                        <label for="projectName">Project Name <span class="required">*</span></label>
                        <input type="text" id="projectName" required placeholder="e.g., Wunderbar Digital Brand Video">
                        <small class="helper-text">Enter a descriptive name for your video project</small>
                    </div>
                    <div class="form-group">
                        <label for="client">Client <span class="required">*</span></label>
                        <input type="text" id="client" required placeholder="e.g., Wunderbar Digital">
                        <small class="helper-text">Enter the client or company name</small>
                    </div>
                    <div class="form-group">
                        <div class="input-wrapper">
                            <label for="websiteUrl">Company Website</label>
                            <div class="url-input-wrapper">
                                <input type="text" id="websiteUrl" placeholder="www.example.com">
                            </div>
                            <small class="helper-text">Enter your company's domain name</small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="brandColors">Brand Colors</label>
                        <div id="brandColors" class="color-palette"></div>
                        <small class="helper-text">Add your brand colors (click to add)</small>
                        <div class="color-input">
                            <input type="color" id="colorPicker">
                            <button type="button" onclick="addBrandColor()">Add Color</button>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="brandKeywords">Brand Keywords</label>
                        <div id="brandKeywords" class="keyword-tags"></div>
                        <small class="helper-text">Add key terms and phrases (click to add)</small>
                        <div class="keyword-input">
                            <input type="text" id="keywordInput" placeholder="Enter keyword">
                            <button type="button" onclick="addKeyword()">Add Keyword</button>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Project Type <span class="required">*</span></label>
                        <div class="option-cards">
                            <div class="option-card" data-value="brand">
                                <h4>Brand Video</h4>
                                <p>Perfect for company introductions and brand awareness</p>
                                <small>Recommended duration: 60s</small>
                            </div>
                            <div class="option-card" data-value="product">
                                <h4>Product Launch</h4>
                                <p>Showcase new products with dynamic visuals</p>
                                <small>Recommended duration: 45s</small>
                            </div>
                            <div class="option-card" data-value="social">
                                <h4>Social Media</h4>
                                <p>Short, engaging content for social platforms</p>
                                <small>Recommended duration: 30s</small>
                            </div>
                            <div class="option-card" data-value="educational">
                                <h4>Educational</h4>
                                <p>Clear, informative content for learning</p>
                                <small>Recommended duration: 90s</small>
                            </div>
                        </div>
                        <small class="helper-text">Choose the type of video you're creating</small>
                    </div>
                    <div class="form-group">
                        <label for="duration">Duration (seconds) <span class="required">*</span></label>
                        <input type="number" id="duration" min="15" max="600" value="30" required>
                        <small class="helper-text">Enter duration between 15 and 600 seconds</small>
                    </div>
                </div>
            </div>

            <div id="content-branding" class="tab-content">
                <div class="form-section">
                    <div class="section-header">
                        <div>
                            <h2 class="section-title">Content & Branding</h2>
                            <p class="section-description">Upload content and define your brand elements</p>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="projectType">Project Type <span class="required">*</span></label>
                        <select id="projectType" required>
                            <option value="">Select a project type</option>
                            <option value="brand">Brand Video</option>
                            <option value="product">Product Launch</option>
                            <option value="social">Social Media</option>
                            <option value="educational">Educational</option>
                        </select>
                        <small class="helper-text">Choose the type of video you're creating</small>
                    </div>
                    <div class="form-group">
                        <label for="duration">Duration (seconds) <span class="required">*</span></label>
                        <input type="number" id="duration" min="15" max="600" value="30" required>
                        <small class="helper-text">Enter duration between 15 and 600 seconds</small>
                    </div>
                </div>
            </div>

            <div id="script-style" class="tab-content">
                <div class="form-section">
                    <div class="section-header">
                        <div>
                            <h2 class="section-title">Script Style</h2>
                            <p class="section-description">Customize your script's tone and style</p>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Tone <span class="required">*</span></label>
                        <div class="tone-variations">
                            <div class="tone-card" data-tone="professional">
                                <h4>Professional</h4>
                                <p>Formal, business-like tone</p>
                            </div>
                            <div class="tone-card" data-tone="casual">
                                <h4>Casual</h4>
                                <p>Relaxed, conversational style</p>
                            </div>
                            <div class="tone-card" data-tone="energetic">
                                <h4>Energetic</h4>
                                <p>High-energy, dynamic delivery</p>
                            </div>
                            <div class="tone-card" data-tone="emotional">
                                <h4>Emotional</h4>
                                <p>Heartfelt, moving narrative</p>
                            </div>
                            <div class="tone-card" data-tone="humorous">
                                <h4>Humorous</h4>
                                <p>Light-hearted, entertaining</p>
                            </div>
                            <div class="tone-card" data-tone="authoritative">
                                <h4>Authoritative</h4>
                                <p>Expert, commanding presence</p>
                            </div>
                            <div class="tone-card" data-tone="inspirational">
                                <h4>Inspirational</h4>
                                <p>Motivating, uplifting message</p>
                            </div>
                        </div>
                        <small class="helper-text">Choose the overall tone of your script</small>
                    </div>
                    <div class="form-group">
                        <label>Style <span class="required">*</span></label>
                        <div class="style-variations">
                            <div class="style-card" data-style="modern">
                                <h4>Modern</h4>
                                <p>Contemporary, sleek design with dynamic transitions</p>
                            </div>
                            <div class="style-card" data-style="classic">
                                <h4>Classic</h4>
                                <p>Timeless, elegant approach with smooth pacing</p>
                            </div>
                            <div class="style-card" data-style="minimal">
                                <h4>Minimal</h4>
                                <p>Clean, focused design with essential elements</p>
                            </div>
                            <div class="style-card" data-style="dynamic">
                                <h4>Dynamic</h4>
                                <p>High-impact visuals with rapid transitions</p>
                            </div>
                        </div>
                        <small class="helper-text">Choose the visual style of your video</small>
                    </div>
                </div>
            </div>

            <div id="preview-export" class="tab-content">
                <div class="form-section">
                    <div class="section-header">
                        <div>
                            <h2 class="section-title">Preview & Export</h2>
                            <p class="section-description">Review your script and choose export options</p>
                        </div>
                    </div>
                    <div class="preview-panel">
                        <div class="preview-controls">
                            <div class="preview-option" onclick="setPreviewMode('standard')">Standard</div>
                            <div class="preview-option" onclick="setPreviewMode('timeline')">Timeline</div>
                            <div class="preview-option" onclick="setPreviewMode('split')">Split View</div>
                            <div class="preview-option" onclick="setPreviewMode('fullscreen')">Fullscreen</div>
                        </div>
                        <div class="timeline-visualization"></div>
                        <pre></pre>
                        <div class="export-options">
                            <div class="export-option" onclick="exportScript('markdown')">Markdown</div>
                            <div class="export-option" onclick="exportScript('pdf')">PDF</div>
                            <div class="export-option" onclick="exportScript('docx')">Word</div>
                            <div class="export-option" onclick="exportScript('txt')">Text</div>
                            <div class="export-option" onclick="exportScript('json')">JSON</div>
                            <div class="export-option" onclick="exportScript('xml')">XML</div>
                            <div class="export-option" onclick="exportScript('finalcut')">Final Cut Pro</div>
                            <div class="export-option" onclick="exportScript('premiere')">Premiere Pro</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-navigation">
                <button type="button" class="nav-button secondary" id="prevButton" disabled>Previous</button>
                <button type="button" class="nav-button primary" id="nextButton">Next</button>
            </div>
        </form>
    </div>

    <script>
        // Add form data management
        let formData = {
            projectType: '',
            style: '',
            tone: '',
            duration: '',
            projectName: '',
            client: '',
            websiteUrl: '',
            brandColors: [],
            brandKeywords: []
        };

        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            initializeForm();
            initializeEventHandlers();
            initializeTabNavigation();
            initializeToneVariations();
            initializeOptionCards();
            initializeTemplateGallery();
            handleUrlInput();
            initializeUpload();
            addHiddenInputs();
            loadFormData();
            initializeFormFields();
        });

        // Form initialization
        function initializeForm() {
            const form = document.getElementById('videoScriptForm');
            form.innerHTML = `
                <div class="form-section">
                    <h2>Project Overview</h2>
                    <div class="form-group">
                        <label for="contentUpload">Upload Content</label>
                        <div class="upload-area" id="uploadArea">
                            <input type="file" id="contentUpload" accept=".txt,.doc,.docx,.pdf,.html" multiple hidden>
                            <div class="upload-prompt">
                                <svg class="upload-icon" viewBox="0 0 24 24" width="48" height="48">
                                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                                </svg>
                                <p>Drag & drop files here or click to upload</p>
                                <p class="upload-hint">Supported formats: TXT, DOC, DOCX, PDF, HTML</p>
                            </div>
                            <div class="uploaded-files" id="uploadedFiles"></div>
                        </div>
                        <small class="helper-text">Upload company documents, website content, or marketing materials to help generate the script</small>
                    </div>
                    <div class="form-group">
                        <label for="projectName">Project Name <span class="required">*</span></label>
                        <input type="text" id="projectName" required placeholder="e.g., Wunderbar Digital Brand Video">
                        <small class="helper-text">Enter a descriptive name for your video project</small>
                    </div>
                    <div class="form-group">
                        <label for="client">Client <span class="required">*</span></label>
                        <input type="text" id="client" required placeholder="e.g., Wunderbar Digital">
                        <small class="helper-text">Enter the client or company name</small>
                    </div>
                    <div class="form-group">
                        <div class="input-wrapper">
                            <label for="websiteUrl">Company Website</label>
                            <div class="url-input-wrapper">
                                <input type="text" id="websiteUrl" placeholder="www.example.com">
                            </div>
                            <small class="helper-text">Enter your company's domain name</small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="brandColors">Brand Colors</label>
                        <div id="brandColors" class="color-palette"></div>
                        <small class="helper-text">Add your brand colors (click to add)</small>
                        <div class="color-input">
                            <input type="color" id="colorPicker">
                            <button type="button" onclick="addBrandColor()">Add Color</button>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="brandKeywords">Brand Keywords</label>
                        <div id="brandKeywords" class="keyword-tags"></div>
                        <small class="helper-text">Add key terms and phrases (click to add)</small>
                        <div class="keyword-input">
                            <input type="text" id="keywordInput" placeholder="Enter keyword">
                            <button type="button" onclick="addKeyword()">Add Keyword</button>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Project Type <span class="required">*</span></label>
                        <div class="option-cards">
                            <div class="option-card" data-value="brand">
                                <h4>Brand Video</h4>
                                <p>Perfect for company introductions and brand awareness</p>
                                <small>Recommended duration: 60s</small>
                            </div>
                            <div class="option-card" data-value="product">
                                <h4>Product Launch</h4>
                                <p>Showcase new products with dynamic visuals</p>
                                <small>Recommended duration: 45s</small>
                            </div>
                            <div class="option-card" data-value="social">
                                <h4>Social Media</h4>
                                <p>Short, engaging content for social platforms</p>
                                <small>Recommended duration: 30s</small>
                            </div>
                            <div class="option-card" data-value="educational">
                                <h4>Educational</h4>
                                <p>Clear, informative content for learning</p>
                                <small>Recommended duration: 90s</small>
                            </div>
                        </div>
                        <small class="helper-text">Choose the type of video you're creating</small>
                    </div>
                    <div class="form-group">
                        <label for="duration">Duration (seconds) <span class="required">*</span></label>
                        <input type="number" id="duration" min="15" max="600" value="30" required>
                        <small class="helper-text">Enter duration between 15 and 600 seconds</small>
                    </div>
                </div>

                <div class="form-section">
                    <h2>Script Style</h2>
                    <div class="form-group">
                        <label>Tone <span class="required">*</span></label>
                        <div class="tone-variations">
                            <div class="tone-card" data-tone="professional">
                                <h4>Professional</h4>
                                <p>Formal, business-like tone</p>
                            </div>
                            <div class="tone-card" data-tone="casual">
                                <h4>Casual</h4>
                                <p>Relaxed, conversational style</p>
                            </div>
                            <div class="tone-card" data-tone="energetic">
                                <h4>Energetic</h4>
                                <p>High-energy, dynamic delivery</p>
                            </div>
                            <div class="tone-card" data-tone="emotional">
                                <h4>Emotional</h4>
                                <p>Heartfelt, moving narrative</p>
                            </div>
                            <div class="tone-card" data-tone="humorous">
                                <h4>Humorous</h4>
                                <p>Light-hearted, entertaining</p>
                            </div>
                            <div class="tone-card" data-tone="authoritative">
                                <h4>Authoritative</h4>
                                <p>Expert, commanding presence</p>
                            </div>
                            <div class="tone-card" data-tone="inspirational">
                                <h4>Inspirational</h4>
                                <p>Motivating, uplifting message</p>
                            </div>
                        </div>
                        <small class="helper-text">Choose the overall tone of your script</small>
                    </div>
                    <div class="form-group">
                        <label>Style <span class="required">*</span></label>
                        <div class="style-variations">
                            <div class="style-card" data-style="modern">
                                <h4>Modern</h4>
                                <p>Contemporary, sleek design with dynamic transitions</p>
                            </div>
                            <div class="style-card" data-style="classic">
                                <h4>Classic</h4>
                                <p>Timeless, elegant approach with smooth pacing</p>
                            </div>
                            <div class="style-card" data-style="minimal">
                                <h4>Minimal</h4>
                                <p>Clean, focused design with essential elements</p>
                            </div>
                            <div class="style-card" data-style="dynamic">
                                <h4>Dynamic</h4>
                                <p>High-impact visuals with rapid transitions</p>
                            </div>
                        </div>
                        <small class="helper-text">Choose the visual style of your video</small>
                    </div>
                    <div class="form-group">
                        <label>Advanced Options</label>
                        <button type="button" onclick="toggleAdvancedOptions()">Show Advanced Options</button>
                        <small class="helper-text">Customize language style and emotional appeal</small>
                    </div>
                </div>

                <div id="advancedOptions" class="advanced-options">
                    <h3>Tone Variations</h3>
                    <div class="tone-variations">
                        <div class="tone-card" data-tone="professional">
                            <h4>Professional</h4>
                            <p>Formal, business-like tone</p>
                        </div>
                        <div class="tone-card" data-tone="casual">
                            <h4>Casual</h4>
                            <p>Relaxed, conversational style</p>
                        </div>
                        <div class="tone-card" data-tone="energetic">
                            <h4>Energetic</h4>
                            <p>High-energy, dynamic delivery</p>
                        </div>
                        <div class="tone-card" data-tone="emotional">
                            <h4>Emotional</h4>
                            <p>Heartfelt, moving narrative</p>
                        </div>
                        <div class="tone-card" data-tone="humorous">
                            <h4>Humorous</h4>
                            <p>Light-hearted, entertaining</p>
                        </div>
                        <div class="tone-card" data-tone="authoritative">
                            <h4>Authoritative</h4>
                            <p>Expert, commanding presence</p>
                        </div>
                        <div class="tone-card" data-tone="inspirational">
                            <h4>Inspirational</h4>
                            <p>Motivating, uplifting message</p>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="languageStyle">Language Style</label>
                        <select id="languageStyle" onchange="updateScript()">
                            <option value="simple">Simple</option>
                            <option value="moderate">Moderate</option>
                            <option value="complex">Complex</option>
                            <option value="technical">Technical</option>
                        </select>
                        <small class="helper-text">Adjust the complexity of language used</small>
                    </div>

                    <div class="form-group">
                        <label for="emotionalAppeal">Emotional Appeal</label>
                        <select id="emotionalAppeal" onchange="updateScript()">
                            <option value="rational">Rational</option>
                            <option value="emotional">Emotional</option>
                            <option value="balanced">Balanced</option>
                            <option value="aspirational">Aspirational</option>
                        </select>
                        <small class="helper-text">Choose how to connect with your audience</small>
                    </div>
                </div>

                <div class="form-section">
                    <div class="form-status">
                        <div id="formProgress" class="progress-bar">
                            <div class="progress-fill"></div>
                        </div>
                        <p id="formStatusText">Complete the form to generate your script</p>
                    </div>
                    <button type="button" onclick="generateScript()" id="generateButton" disabled>Generate Script</button>
                </div>
            `;

            // Initialize upload functionality
            initializeUpload();

            // Add event listeners for form validation
            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                field.addEventListener('input', validateFormFields);
            });
        }

        // Event handlers
        function initializeEventHandlers() {
            const cleanup = [];

            function addEventListenerWithCleanup(element, event, handler) {
                if (!element) {
                    console.warn(`Element not found for event: ${event}`);
                    return;
                }
                element.addEventListener(event, handler);
                cleanup.push(() => element.removeEventListener(event, handler));
            }

            const durationField = document.getElementById('duration');
            const toneField = document.getElementById('tone');
            const styleField = document.getElementById('style');

            addEventListenerWithCleanup(durationField, 'change', updateTimelinePreview);
            addEventListenerWithCleanup(toneField, 'change', updateScript);
            addEventListenerWithCleanup(styleField, 'change', updateScript);

            return cleanup;
        }

        // Script generation
        function generateScript() {
            if (!validateForm()) return;

            const data = {
                projectName: document.getElementById('projectName').value,
                client: document.getElementById('client').value,
                projectType: document.getElementById('projectType').value,
                duration: parseInt(document.getElementById('duration').value),
                tone: document.getElementById('tone').value,
                style: document.getElementById('style').value,
                languageStyle: document.getElementById('languageStyle').value,
                emotionalAppeal: document.getElementById('emotionalAppeal').value
            };

            const script = generateScriptContent(data);
            displayScript(script);
            updateTimelinePreview();
        }

        // Form validation
        function validateForm() {
            const form = document.getElementById('videoScriptForm');
            if (!form) {
                console.error('Form element not found');
                return false;
            }

            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            const errors = [];

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('invalid');
                    errors.push(`${field.name || field.id} is required`);
                    isValid = false;
                } else {
                    field.classList.remove('invalid');
                }
            });

            // Validate URL format
            const urlField = document.getElementById('websiteUrl');
            if (urlField && urlField.value) {
                try {
                    new URL(urlField.value);
                } catch (e) {
                    urlField.classList.add('invalid');
                    errors.push('Please enter a valid URL');
                    isValid = false;
                }
            }

            // Validate duration
            const durationField = document.getElementById('duration');
            if (durationField) {
                const duration = parseInt(durationField.value);
                if (isNaN(duration) || duration < 15 || duration > 600) {
                    durationField.classList.add('invalid');
                    errors.push('Duration must be between 15 and 600 seconds');
                    isValid = false;
                }
            }

            if (!isValid) {
                showNotification(errors.join('\n'), 'error');
                return false;
            }

            return true;
        }

        // Script content generation
        function generateScriptContent(data) {
            const sections = calculateSections(data.duration);
            const openingText = processLanguage(generateOpeningText(data), data.languageStyle, data.emotionalAppeal);
            const mainContent = processLanguage(generateMainContent(data), data.languageStyle, data.emotionalAppeal);
            const callToAction = processLanguage(generateCallToAction(data), data.languageStyle, data.emotionalAppeal);
            
            // Get brand colors and keywords
            const brandColors = Array.from(document.querySelectorAll('.color-swatch'))
                .map(swatch => swatch.style.backgroundColor);
            const brandKeywords = Array.from(document.querySelectorAll('.keyword-tag'))
                .map(tag => tag.textContent);
            
            return `# ${data.projectName} - Video Script

## Opening (0:00 - ${sections.opening}s)
[${data.tone} background music]
[Visual: ${data.style} style opening with brand elements]
[Brand Colors: ${brandColors.join(', ')}]

NARRATOR:
"${openingText}"

## Main Content (${sections.opening}s - ${sections.main}s)
[Visual: ${data.style} style showcase of key elements]
[Key Brand Elements: ${brandKeywords.join(', ')}]

NARRATOR:
"${mainContent}"

## Call to Action (${sections.main}s - ${sections.end}s)
[Visual: Clear call-to-action with contact information]

NARRATOR:
"${callToAction}"

## Technical Notes
- Duration: ${data.duration} seconds
- Style: ${data.tone}
- Visual Style: ${data.style}
- Language Style: ${data.languageStyle}
- Emotional Appeal: ${data.emotionalAppeal}
- Brand Colors: ${brandColors.join(', ')}
- Key Brand Elements: ${brandKeywords.join(', ')}
- Subtitles/closed captions for accessibility`;
        }

        // Helper functions
        function calculateSections(duration) {
            return {
                opening: Math.floor(duration * 0.2),
                main: Math.floor(duration * 0.7),
                end: duration
            };
        }

        function generateOpeningText(data) {
            const openings = {
                professional: "Welcome to the future of digital excellence.",
                casual: "Hey there! Welcome to something amazing.",
                energetic: "Get ready to revolutionize your digital experience!",
                emotional: "Experience the power of meaningful connections.",
                humorous: "Who says digital can't be fun?",
                authoritative: "Leading the digital revolution.",
                inspirational: "Imagine what's possible."
            };
            return openings[data.tone] || openings.professional;
        }

        function generateMainContent(data) {
            const contentTemplates = {
                brand: "From innovative solutions to cutting-edge technology, we deliver excellence in every detail.",
                product: "Experience our latest innovation, designed to transform your digital landscape.",
                social: "Join us on a journey of creativity and connection.",
                educational: "Discover a new way of learning and growing."
            };
            return contentTemplates[data.projectType] || contentTemplates.brand;
        }

        function generateCallToAction(data) {
            return `Ready to begin your journey? Visit our website to learn more about how we can help you achieve your goals.`;
        }

        function processLanguage(text, style, appeal) {
            let processed = text;
            
            // Apply language style
            switch(style) {
                case 'simple':
                    processed = simplifyLanguage(processed);
                    break;
                case 'complex':
                    processed = complexifyLanguage(processed);
                    break;
                case 'technical':
                    processed = technicalizeLanguage(processed);
                    break;
            }
            
            // Apply emotional appeal
            switch(appeal) {
                case 'emotional':
                    processed = addEmotionalAppeal(processed);
                    break;
                case 'rational':
                    processed = addRationalAppeal(processed);
                    break;
                case 'aspirational':
                    processed = addAspirationalAppeal(processed);
                    break;
            }
            
            return processed;
        }

        function simplifyLanguage(text) {
            return text.replace(/extraordinary/g, 'amazing')
                      .replace(/revolutionize/g, 'change')
                      .replace(/innovative/g, 'new');
        }

        function complexifyLanguage(text) {
            return text.replace(/amazing/g, 'extraordinary')
                      .replace(/change/g, 'revolutionize')
                      .replace(/new/g, 'innovative');
        }

        function technicalizeLanguage(text) {
            return text.replace(/amazing/g, 'optimized')
                      .replace(/change/g, 'transform')
                      .replace(/new/g, 'cutting-edge');
        }

        function addEmotionalAppeal(text) {
            return text.replace(/Welcome/g, 'Experience the joy of')
                      .replace(/Introducing/g, 'Feel the power of')
                      .replace(/Get ready/g, 'Prepare to be moved by');
        }

        function addRationalAppeal(text) {
            return text.replace(/Welcome/g, 'Discover the proven benefits of')
                      .replace(/Introducing/g, 'Experience the efficiency of')
                      .replace(/Get ready/g, 'Prepare to optimize with');
        }

        function addAspirationalAppeal(text) {
            return text.replace(/Welcome/g, 'Achieve your dreams with')
                      .replace(/Introducing/g, 'Reach new heights with')
                      .replace(/Get ready/g, 'Prepare to excel with');
        }

        // Display functions
        function displayScript(script) {
            const previewSection = document.querySelector('.preview-panel') || createPreviewSection();
            previewSection.innerHTML = `
                <div class="preview-controls">
                    <div class="preview-option" onclick="setPreviewMode('standard')">Standard</div>
                    <div class="preview-option" onclick="setPreviewMode('timeline')">Timeline</div>
                    <div class="preview-option" onclick="setPreviewMode('split')">Split View</div>
                    <div class="preview-option" onclick="setPreviewMode('fullscreen')">Fullscreen</div>
                </div>
                <div class="timeline-visualization"></div>
                <pre>${script}</pre>
                <div class="export-options">
                    <div class="export-option" onclick="exportScript('markdown')">Markdown</div>
                    <div class="export-option" onclick="exportScript('pdf')">PDF</div>
                    <div class="export-option" onclick="exportScript('docx')">Word</div>
                    <div class="export-option" onclick="exportScript('txt')">Text</div>
                    <div class="export-option" onclick="exportScript('json')">JSON</div>
                    <div class="export-option" onclick="exportScript('xml')">XML</div>
                    <div class="export-option" onclick="exportScript('finalcut')">Final Cut Pro</div>
                    <div class="export-option" onclick="exportScript('premiere')">Premiere Pro</div>
                </div>
            `;
            updateTimelinePreview();
        }

        function createPreviewSection() {
            const section = document.createElement('div');
            section.className = 'form-section preview-panel';
            document.getElementById('videoScriptForm').appendChild(section);
            return section;
        }

        function updateTimelinePreview() {
            const duration = parseInt(document.getElementById('duration').value);
            const sections = calculateSections(duration);
            
            const timelineSection = document.querySelector('.timeline-visualization');
            if (!timelineSection) return;

            timelineSection.innerHTML = `
                <div class="timeline-segment" style="left: 0%; width: 20%;">
                    <div class="timeline-label">Opening (0:00 - ${sections.opening}s)</div>
                </div>
                <div class="timeline-segment" style="left: 20%; width: 50%;">
                    <div class="timeline-label">Main (${sections.opening}s - ${sections.main}s)</div>
                </div>
                <div class="timeline-segment" style="left: 70%; width: 30%;">
                    <div class="timeline-label">CTA (${sections.main}s - ${sections.end}s)</div>
                </div>
            `;
        }

        // Preview mode functions
        function setPreviewMode(mode) {
            const previewOptions = document.querySelectorAll('.preview-option');
            previewOptions.forEach(option => option.classList.remove('active'));
            event.target.classList.add('active');

            const container = document.querySelector('.preview-panel');
            const script = container.querySelector('pre').textContent;
            
            switch(mode) {
                case 'standard':
                    container.innerHTML = `<pre>${script}</pre>`;
                    break;
                case 'timeline':
                    container.innerHTML = `
                        <div class="timeline-visualization"></div>
                        <pre>${script}</pre>
                    `;
                    updateTimelinePreview();
                    break;
                case 'split':
                    container.innerHTML = `
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div>
                                <h3>Timeline</h3>
                                <div class="timeline-visualization"></div>
                            </div>
                            <div>
                                <h3>Script</h3>
                                <pre>${script}</pre>
                            </div>
                        </div>
                    `;
                    updateTimelinePreview();
                    break;
                case 'fullscreen':
                    const previewWindow = window.open('', 'Script Preview', 'width=1200,height=800');
                    previewWindow.document.write(`
                        <html>
                            <head>
                                <title>Script Preview</title>
                                <style>
                                    body { 
                                        font-family: 'SF Mono', monospace; 
                                        padding: 20px;
                                        background: #1d1d1f;
                                        color: #f5f5f7;
                                    }
                                    .timeline { margin: 20px 0; }
                                    pre { white-space: pre-wrap; }
                                </style>
                            </head>
                            <body>
                                <div class="timeline-visualization"></div>
                                <pre>${script}</pre>
                            </body>
                        </html>
                    `);
                    updateTimelinePreview(previewWindow.document);
                    break;
            }
        }

        // Export functions
        async function exportScript(format) {
            const previewPanel = document.querySelector('.preview-panel pre');
            if (!previewPanel) {
                showNotification('No script content to export', 'error');
                return;
            }

            const script = previewPanel.textContent;
            if (!script.trim()) {
                showNotification('Script content is empty', 'error');
                return;
            }

            const metadata = {
                projectName: document.getElementById('projectName')?.value || 'Untitled',
                client: document.getElementById('client')?.value || 'Unknown',
                duration: document.getElementById('duration')?.value || '0',
                timestamp: new Date().toISOString(),
                version: '1.0'
            };

            try {
                showNotification('Preparing export...', 'loading');
                
                switch(format) {
                    case 'pdf':
                        await exportToPDF(script, metadata);
                        break;
                    case 'docx':
                        await exportToWord(script, metadata);
                        break;
                    case 'xml':
                        exportToXML(script, metadata);
                        break;
                    case 'finalcut':
                        exportToFinalCut(script, metadata);
                        break;
                    case 'premiere':
                        exportToPremiere(script, metadata);
                        break;
                    case 'markdown':
                        downloadFile(script, 'video-script.md', 'text/markdown');
                        break;
                    case 'txt':
                        downloadFile(script, 'video-script.txt', 'text/plain');
                        break;
                    case 'json':
                        const jsonData = {
                            script: script,
                            metadata: metadata
                        };
                        downloadFile(JSON.stringify(jsonData, null, 2), 'video-script.json', 'application/json');
                        break;
                    default:
                        throw new Error('Unsupported export format');
                }
                
                showNotification('Export completed successfully', 'success');
            } catch (error) {
                console.error('Export error:', error);
                showNotification('Error during export. Please try again.', 'error');
            }
        }

        function exportToPDF(script, metadata) {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            doc.setFontSize(20);
            doc.text(metadata.projectName, 20, 20);
            doc.setFontSize(12);
            doc.text(`Client: ${metadata.client}`, 20, 30);
            doc.text(`Duration: ${metadata.duration} seconds`, 20, 40);
            
            doc.setFontSize(10);
            const lines = script.split('\n');
            let y = 50;
            lines.forEach(line => {
                if (y > 280) {
                    doc.addPage();
                    y = 20;
                }
                doc.text(line, 20, y);
                y += 7;
            });
            
            doc.save('video-script.pdf');
        }

        function exportToWord(script, metadata) {
            const doc = new docx.Document({
                sections: [{
                    properties: {},
                    children: [
                        new docx.Paragraph({
                            children: [
                                new docx.TextRun({
                                    text: metadata.projectName,
                                    bold: true,
                                    size: 32
                                })
                            ]
                        }),
                        new docx.Paragraph({
                            children: [
                                new docx.TextRun({
                                    text: `Client: ${metadata.client}`,
                                    size: 24
                                })
                            ]
                        }),
                        new docx.Paragraph({
                            children: [
                                new docx.TextRun({
                                    text: script,
                                    size: 24
                                })
                            ]
                        })
                    ]
                }]
            });

            docx.Packer.toBlob(doc).then(blob => {
                saveAs(blob, 'video-script.docx');
            });
        }

        function exportToXML(script, metadata) {
            const xml = `<?xml version="1.0" encoding="UTF-8"?>
<videoScript>
    <metadata>
        <projectName>${metadata.projectName}</projectName>
        <client>${metadata.client}</client>
        <duration>${metadata.duration}</duration>
        <timestamp>${metadata.timestamp}</timestamp>
        <version>${metadata.version}</version>
    </metadata>
    <content>
        ${script.split('\n').map(line => `<line>${line}</line>`).join('\n')}
    </content>
</videoScript>`;
            
            downloadFile(xml, 'video-script.xml', 'application/xml');
        }

        function exportToFinalCut(script, metadata) {
            const fcpXML = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE fcpxml>
<fcpxml version="1.8">
    <resources>
        <format id="r1" name="FFVideoFormat1080p30" frameDuration="1001/30000s"/>
    </resources>
    <library>
        <event name="${metadata.projectName}">
            <project name="Video Script">
                <sequence format="r1">
                    ${generateFinalCutClips(script, metadata)}
                </sequence>
            </project>
        </event>
    </library>
</fcpxml>`;
            
            downloadFile(fcpXML, 'video-script.fcpxml', 'application/xml');
        }

        function exportToPremiere(script, metadata) {
            const premiereXML = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xmeml>
<xmeml version="5">
    <project>
        <name>${metadata.projectName}</name>
        <children>
            <bin>
                <name>Script</name>
                ${generatePremiereClips(script, metadata)}
            </bin>
        </children>
    </project>
</xmeml>`;
            
            downloadFile(premiereXML, 'video-script.prproj', 'application/xml');
        }

        function generateFinalCutClips(script, metadata) {
            return `<clip name="Opening" duration="${metadata.duration * 0.2}s"/>
                   <clip name="Main" duration="${metadata.duration * 0.5}s"/>
                   <clip name="CTA" duration="${metadata.duration * 0.3}s"/>`;
        }

        function generatePremiereClips(script, metadata) {
            return `<clip>
                       <name>Opening</name>
                       <duration>${metadata.duration * 0.2}</duration>
                   </clip>
                   <clip>
                       <name>Main</name>
                       <duration>${metadata.duration * 0.5}</duration>
                   </clip>
                   <clip>
                       <name>CTA</name>
                       <duration>${metadata.duration * 0.3}</duration>
                   </clip>`;
        }

        function downloadFile(content, fileName, contentType) {
            const blob = new Blob([content], { type: contentType });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        }

        // Utility functions
        function toggleAdvancedOptions() {
            const advancedOptions = document.getElementById('advancedOptions');
            advancedOptions.style.display = advancedOptions.style.display === 'none' ? 'block' : 'none';
        }

        function setTone(tone) {
            document.querySelectorAll('.tone-card').forEach(option => {
                option.classList.remove('active');
                if (option.getAttribute('data-tone') === tone) {
                    option.classList.add('active');
                }
            });
            document.getElementById('tone').value = tone;
            updateScript();
        }

        function updateScript() {
            generateScript();
        }

        // File upload functionality
        function initializeUpload() {
            const uploadArea = document.getElementById('uploadArea');
            const fileInput = document.getElementById('contentUpload');
            const uploadedFiles = document.getElementById('uploadedFiles');

            if (!uploadArea || !fileInput || !uploadedFiles) return;

            // Click to upload
            uploadArea.addEventListener('click', () => fileInput.click());

            // Drag and drop
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('dragover');
            });

            uploadArea.addEventListener('dragleave', () => {
                uploadArea.classList.remove('dragover');
            });

            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('dragover');
                handleFiles(e.dataTransfer.files);
            });

            // File input change
            fileInput.addEventListener('change', (e) => {
                handleFiles(e.target.files);
            });
        }

        function handleFiles(files) {
            const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
            const uploadedFiles = document.getElementById('uploadedFiles');
            if (!uploadedFiles) return;

            Array.from(files).forEach(file => {
                if (!isValidFileType(file)) {
                    showNotification(`Invalid file type: ${file.name}`, 'error');
                    return;
                }

                if (file.size > MAX_FILE_SIZE) {
                    showNotification(`File too large: ${file.name}`, 'error');
                    return;
                }

                addFileToList(file);
                showNotification(`Successfully added: ${file.name}`, 'success');
            });
        }

        function isValidFileType(file) {
            const validTypes = [
                'text/plain',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/pdf',
                'text/html',
                'image/jpeg',
                'image/jpg',
                'image/svg+xml'
            ];
            return validTypes.includes(file.type);
        }

        function addFileToList(file) {
            const uploadedFiles = document.getElementById('uploadedFiles');
            if (!uploadedFiles) return;

            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            
            const fileSize = formatFileSize(file.size);
            const isImage = file.type.startsWith('image/');
            
            let fileIcon = '';
            if (isImage) {
                fileIcon = `
                    <svg class="file-icon" viewBox="0 0 24 24">
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                    </svg>
                `;
            } else {
                fileIcon = `
                    <svg class="file-icon" viewBox="0 0 24 24">
                        <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
                    </svg>
                `;
            }
            
            fileItem.innerHTML = `
                ${fileIcon}
                <div class="file-info">
                    <div class="file-name">${file.name}</div>
                    <div class="file-size">${fileSize}</div>
                    ${isImage ? '<div class="file-preview"></div>' : ''}
                </div>
                <button type="button" class="file-remove" onclick="removeFile(this)">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </button>
            `;
            
            uploadedFiles.appendChild(fileItem);

            // If it's an image, create a preview
            if (isImage) {
                const preview = fileItem.querySelector('.file-preview');
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    if (file.type === 'image/svg+xml') {
                        preview.innerHTML = e.target.result;
                    } else {
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        preview.appendChild(img);
                    }
                };
                
                if (file.type === 'image/svg+xml') {
                    reader.readAsText(file);
                } else {
                    reader.readAsDataURL(file);
                }
            }
        }

        function removeFile(button) {
            const fileItem = button.closest('.file-item');
            if (fileItem) {
                fileItem.remove();
            }
        }

        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }

        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.classList.add('fade-out');
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }

        // Brand color and keyword management
        function addBrandColor() {
            const colorPicker = document.getElementById('colorPicker');
            const colorPalette = document.getElementById('brandColors');
            
            const colorSwatch = document.createElement('div');
            colorSwatch.className = 'color-swatch';
            colorSwatch.style.backgroundColor = colorPicker.value;
            colorSwatch.title = colorPicker.value;
            
            colorPalette.appendChild(colorSwatch);
        }

        function addKeyword() {
            const keywordInput = document.getElementById('keywordInput');
            const keywordContainer = document.getElementById('brandKeywords');
            
            if (keywordInput.value.trim()) {
                const keywordTag = document.createElement('span');
                keywordTag.className = 'keyword-tag';
                keywordTag.textContent = keywordInput.value.trim();
                keywordContainer.appendChild(keywordTag);
                
                keywordInput.value = '';
            }
        }

        async function analyzeUrl() {
            const urlField = document.getElementById('websiteUrl');
            const analyzeButton = document.getElementById('analyzeButton');
            
            if (!urlField || !analyzeButton) return;

            const url = urlField.value.trim();
            if (!url) {
                showNotification('Please enter a valid URL', 'error');
                return;
            }

            try {
                new URL(url); // Validate URL format
            } catch (e) {
                showNotification('Please enter a valid URL format', 'error');
                return;
            }

            const originalText = analyzeButton.textContent;
            analyzeButton.disabled = true;
            showUrlStatus('Analyzing URL...', 'loading');

            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

                const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
                const response = await fetch(proxyUrl, { signal: controller.signal });
                clearTimeout(timeoutId);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const content = await response.text();
                const extractedInfo = extractContentInfo(content, 'text/html');
                updateFormWithContentInfo(extractedInfo);
                
                showUrlStatus('URL analyzed successfully!', 'success');
            } catch (error) {
                console.error('Error analyzing URL:', error);
                showUrlStatus(
                    error.name === 'AbortError' 
                        ? 'Request timed out. Please try again.' 
                        : 'Error analyzing URL. Please try again.',
                    'error'
                );
            } finally {
                analyzeButton.disabled = false;
                analyzeButton.textContent = originalText;
            }
        }

        function showUrlStatus(message, type) {
            const statusDiv = document.getElementById('urlStatus');
            statusDiv.textContent = message;
            statusDiv.className = `url-status ${type}`;
            
            if (type === 'success') {
                setTimeout(() => {
                    statusDiv.style.display = 'none';
                }, 3000);
            }
        }

        // Tab Navigation with Jump Support
        function initializeTabNavigation() {
            const tabButtons = document.querySelectorAll('.tab-button');
            const tabContents = document.querySelectorAll('.tab-content');
            const progressSteps = document.querySelectorAll('.progress-step');
            const prevButton = document.getElementById('prevButton');
            const nextButton = document.getElementById('nextButton');
            let currentTab = 0;

            function validateCurrentTab() {
                const currentContent = tabContents[currentTab];
                const requiredFields = currentContent.querySelectorAll('[required]');
                let isValid = true;

                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                        showFieldError(field);
                    } else {
                        field.classList.remove('error');
                        hideFieldError(field);
                    }
                });

                return isValid;
            }

            function showFieldError(field) {
                const errorMessage = field.getAttribute('data-error') || 'This field is required';
                let errorElement = field.parentElement.querySelector('.field-error');
                
                if (!errorElement) {
                    errorElement = document.createElement('div');
                    errorElement.className = 'field-error';
                    field.parentElement.appendChild(errorElement);
                }
                
                errorElement.textContent = errorMessage;
            }

            function hideFieldError(field) {
                const errorElement = field.parentElement.querySelector('.field-error');
                if (errorElement) {
                    errorElement.remove();
                }
            }

            function updateTabs(index) {
                // Validate current tab before allowing navigation
                if (index > currentTab && !validateCurrentTab()) {
                    showNotification('Please fill in all required fields', 'error');
                    return;
                }

                // Update tab buttons
                tabButtons.forEach((button, i) => {
                    button.classList.toggle('active', i === index);
                    // Mark previous tabs as completed
                    button.classList.toggle('completed', i < index);
                });

                // Update tab contents
                tabContents.forEach((content, i) => {
                    content.classList.toggle('active', i === index);
                });

                // Update progress steps
                progressSteps.forEach((step, i) => {
                    step.classList.toggle('active', i === index);
                    step.classList.toggle('completed', i < index);
                });

                // Update navigation buttons
                prevButton.disabled = index === 0;
                nextButton.textContent = index === tabContents.length - 1 ? 'Generate Script' : 'Next';
                
                // Update current tab
                currentTab = index;

                // Save form state
                saveFormState();
            }

            // Allow clicking on any tab
            tabButtons.forEach((button, index) => {
                    updateTabs(currentTab);
                });
            });

            prevButton.addEventListener('click', () => {
                if (currentTab > 0) {
                    currentTab--;
                    updateTabs(currentTab);
                }
            });

            nextButton.addEventListener('click', () => {
                if (currentTab < tabContents.length - 1) {
                    currentTab++;
                    updateTabs(currentTab);
                } else {
                    generateScript();
                }
            });

            // Add keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft' && !prevButton.disabled) {
                    prevButton.click();
                } else if (e.key === 'ArrowRight' && currentTab < tabContents.length - 1) {
                    nextButton.click();
                }
            });
        }

        // Initialize Tone Variations
        function initializeToneVariations() {
            const toneCards = document.querySelectorAll('.tone-card');
            const toneSelect = document.getElementById('tone');

            toneCards.forEach(card => {
                card.addEventListener('click', () => {
                    const tone = card.getAttribute('data-tone');
                    toneCards.forEach(c => c.classList.remove('active'));
                    card.classList.add('active');
                    toneSelect.value = tone;
                    updateScript();
                });
            });
        }

        // Initialize Option Cards
        function initializeOptionCards() {
            // Project Type cards
            const optionCards = document.querySelectorAll('.option-card');
            optionCards.forEach(card => {
                // Set initial active state if value matches
                if (card.getAttribute('data-value') === formData.projectType) {
                    card.classList.add('active');
                }

                card.addEventListener('click', () => {
                    const value = card.getAttribute('data-value');
                    optionCards.forEach(c => c.classList.remove('active'));
                    card.classList.add('active');
                    
                    // Update form data
                    formData.projectType = value;
                    
                    // Update hidden input
                    const projectTypeInput = document.getElementById('projectType');
                    if (projectTypeInput) {
                        projectTypeInput.value = value;
                    }
                    
                    // Update duration if available
                    const durationInput = document.getElementById('duration');
                    if (durationInput) {
                        const duration = card.querySelector('small')?.textContent.match(/\d+/);
                        if (duration) {
                            const durationValue = duration[0];
                            durationInput.value = durationValue;
                            formData.duration = durationValue;
                        }
                    }

                    // Save to localStorage
                    saveFormData();
                });
            });

            // Style cards
            const styleCards = document.querySelectorAll('.style-card');
            styleCards.forEach(card => {
                // Set initial active state if value matches
                if (card.getAttribute('data-style') === formData.style) {
                    card.classList.add('active');
                }

                card.addEventListener('click', () => {
                    const value = card.getAttribute('data-style');
                    styleCards.forEach(c => c.classList.remove('active'));
                    card.classList.add('active');
                    
                    // Update form data
                    formData.style = value;
                    
                    // Update hidden input
                    const styleInput = document.getElementById('style');
                    if (styleInput) {
                        styleInput.value = value;
                    }

                    // Save to localStorage
                    saveFormData();
                });
            });

            // Tone cards
            const toneCards = document.querySelectorAll('.tone-card');
            toneCards.forEach(card => {
                // Set initial active state if value matches
                if (card.getAttribute('data-tone') === formData.tone) {
                    card.classList.add('active');
                }

                card.addEventListener('click', () => {
                    const value = card.getAttribute('data-tone');
                    toneCards.forEach(c => c.classList.remove('active'));
                    card.classList.add('active');
                    
                    // Update form data
                    formData.tone = value;
                    
                    // Update hidden input
                    const toneInput = document.getElementById('tone');
                    if (toneInput) {
                        toneInput.value = value;
                    }

                    // Save to localStorage
                    saveFormData();
                });
            });
        }

        // Add Template Gallery
        function initializeTemplateGallery() {
            const templates = [
                {
                    name: 'Brand Story',
                    description: 'Perfect for company introductions and brand awareness',
                    duration: 60,
                    tone: 'professional'
                },
                {
                    name: 'Product Launch',
                    description: 'Showcase new products with dynamic visuals',
                    duration: 45,
                    tone: 'energetic'
                },
                {
                    name: 'Social Media',
                    description: 'Short, engaging content for social platforms',
                    duration: 30,
                    tone: 'casual'
                },
                {
                    name: 'Educational',
                    description: 'Clear, informative content for learning',
                    duration: 90,
                    tone: 'authoritative'
                }
            ];

            const gallery = document.createElement('div');
            gallery.className = 'template-gallery';
            
            templates.forEach(template => {
                const card = document.createElement('div');
                card.className = 'template-card';
                card.innerHTML = `
                    <h3>${template.name}</h3>
                    <p>${template.description}</p>
                    <small>Duration: ${template.duration}s | Tone: ${template.tone}</small>
                `;
                card.addEventListener('click', () => applyTemplate(template));
                gallery.appendChild(card);
            });

            document.querySelector('#project-details .form-section').prepend(gallery);
        }

        function applyTemplate(template) {
            document.getElementById('duration').value = template.duration;
            document.getElementById('tone').value = template.tone;
            document.getElementById('projectType').value = template.name.toLowerCase().replace(' ', '_');
            updateScript();
            showNotification('Template applied successfully', 'success');
        }

        // Update URL handling
        function handleUrlInput() {
            const urlInput = document.getElementById('websiteUrl');
            if (urlInput) {
                urlInput.addEventListener('input', (e) => {
                    // Remove any protocol if user types it
                    let value = e.target.value.replace(/^https?:\/\//, '');
                    // Remove any trailing slashes
                    value = value.replace(/\/$/, '');
                    e.target.value = value;
                });
            }
        }

        // Add hidden inputs for form submission
        function addHiddenInputs() {
            const form = document.getElementById('videoScriptForm');
            if (!form) return;

            // Add hidden inputs if they don't exist
            if (!document.getElementById('projectType')) {
                const projectTypeInput = document.createElement('input');
                projectTypeInput.type = 'hidden';
                projectTypeInput.id = 'projectType';
                projectTypeInput.name = 'projectType';
                form.appendChild(projectTypeInput);
            }

            if (!document.getElementById('style')) {
                const styleInput = document.createElement('input');
                styleInput.type = 'hidden';
                styleInput.id = 'style';
                styleInput.name = 'style';
                form.appendChild(styleInput);
            }

            if (!document.getElementById('tone')) {
                const toneInput = document.createElement('input');
                toneInput.type = 'hidden';
                toneInput.id = 'tone';
                toneInput.name = 'tone';
                form.appendChild(toneInput);
            }
        }

        // Add form data persistence
        function saveFormData() {
            try {
                localStorage.setItem('videoScriptFormData', JSON.stringify(formData));
            } catch (error) {
                console.error('Error saving form data:', error);
            }
        }

        function loadFormData() {
            try {
                const savedData = localStorage.getItem('videoScriptFormData');
                if (savedData) {
                    formData = JSON.parse(savedData);
                    updateFormFromData();
                }
            } catch (error) {
                console.error('Error loading form data:', error);
            }
        }

        function updateFormFromData() {
            // Update project type
            const projectTypeInput = document.getElementById('projectType');
            if (projectTypeInput) {
                projectTypeInput.value = formData.projectType;
            }
            document.querySelectorAll('.option-card').forEach(card => {
                if (card.getAttribute('data-value') === formData.projectType) {
                    card.classList.add('active');
                }
            });

            // Update style
            const styleInput = document.getElementById('style');
            if (styleInput) {
                styleInput.value = formData.style;
            }
            document.querySelectorAll('.style-card').forEach(card => {
                if (card.getAttribute('data-style') === formData.style) {
                    card.classList.add('active');
                }
            });

            // Update tone
            const toneInput = document.getElementById('tone');
            if (toneInput) {
                toneInput.value = formData.tone;
            }
            document.querySelectorAll('.tone-card').forEach(card => {
                if (card.getAttribute('data-tone') === formData.tone) {
                    card.classList.add('active');
                }
            });

            // Update duration
            const durationInput = document.getElementById('duration');
            if (durationInput && formData.duration) {
                durationInput.value = formData.duration;
            }

            // Update other form fields
            const projectNameInput = document.getElementById('projectName');
            if (projectNameInput && formData.projectName) {
                projectNameInput.value = formData.projectName;
            }

            const clientInput = document.getElementById('client');
            if (clientInput && formData.client) {
                clientInput.value = formData.client;
            }

            const websiteUrlInput = document.getElementById('websiteUrl');
            if (websiteUrlInput && formData.websiteUrl) {
                websiteUrlInput.value = formData.websiteUrl;
            }
        }

        // Add input event listeners for form fields
        function initializeFormFields() {
            const inputs = document.querySelectorAll('input[type="text"], input[type="number"]');
            inputs.forEach(input => {
                input.addEventListener('input', (e) => {
                    formData[e.target.id] = e.target.value;
                    saveFormData();
                });
            });
        }
    </script>
</body>
</html >