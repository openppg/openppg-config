---
permalink: /index.html
---

# OpenPPG Config
 Configure your OpenPPG controller via WebUSB

 Lives at https://openppg.github.io/openppg-config/

### Notes:

- Only works in Google Chrome and related chromium variants (like Brave browser and new Microsoft Edge)
- Also tested and working in Chrome on Android
- In Windows you may have to enable the new USB backed by navigating to `chrome://flags/#new-usb-backend`

### Local development

Chrome requires that websites are served over HTTPS, even locally, to use WebUSB. To do this I use the http-server node package in the main directory like this:

`http-server --ssl --cert ~/.localhost-ssl/localhost.crt --key ~/.localhost-ssl/localhost.key`

### Contributing

Contributions are welcome via Github pull requests.

For all contributions, please respect the following guidelines:

- Each pull request should implement ONE feature or bugfix. If you want to add or fix more than one thing, submit more than one pull request.
- Do not commit changes to files that are irrelevant to your feature or bugfix (eg: `.gitignore`).
- Be aware that the pull request review process is not immediate, and is generally proportional to the size of the pull request.
