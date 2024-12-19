# **Contributing to Sightseeing Map App**

Thank you for considering contributing to this project! Please follow these guidelines to ensure a smooth and productive workflow for everyone.

---

## **Getting Started**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AstromaoLabs/sightseeing-map
   cd sightseeing-map
   ```

2. **Set up your development environment**:
   - Install dependencies:
     ```bash
     npm install  # For frontend
     pip install -r backend/requirements.txt  # For backend
     ```

3. **Follow the workflow in the section below**:

---

## **Workflow**

1. **Pick an issue**:
   - Browse the [GitHub Issues](https://github.com/AstromaoLabs/sightseeing-map/issues) for tasks.
   - Comment on the issue to indicate you're working on it.

2. **Create a new branch for your work**:
   - Use the following naming format:
     ```bash
     git checkout -b issue-#<issue-number>-<short-description>
     ```
     Example:
     ```bash
     git checkout -b issue-#5-add-login-page
     ```
     
3. **Work on your branch**:
   - Implement your changes.
   - Make small, meaningful commits:
     ```bash
     git add .
     git commit -m "Fix #<issue-number>: <commit-message>"
     ```
     Example:
     ```bash
     git commit -m "Fix #5: Add login page with form"
     ```

3. **Push your branch**:
   ```bash
   git push origin issue-#<issue-number>-<short-description>
   ```

---

## **Create a Pull Request (PR)**

1. Open a new PR on GitHub.
2. Fill out the required details in the PR template (this will appear automatically).
3. Link the PR to the issue by including `Fixes #<issue-number>` in the description.
4. Request reviewers and address any feedback.

You can find the PR template [here](.github/pull_request_template.md).

---

## **Best Practices**

- **Keep changes focused**: Address one issue per branch and PR.
- **Write meaningful commit messages**: Clearly describe your changes.
- **Test thoroughly**: Ensure all changes work as expected.
- **Follow code standards**: Adhere to the project's style and guidelines.

---

## **Need Help?**

If you have any questions, feel free to comment under the relevant issue, open a new one or contact us.

---

Thank you for contributing!
