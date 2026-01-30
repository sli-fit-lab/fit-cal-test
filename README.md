
# 🗓️ Smart Event Calendar (Cloud Deploy)

If you cannot see "Deploy to GitHub Pages" in your **Actions** tab, GitHub likely didn't receive your configuration folder.

## 🛠️ FOOLPROOF DEPLOYMENT FIX

When you upload files via the web browser, **the `.github` folder is often missed** because it is a "hidden" folder on your computer.

### The Fix:
1. Go to your GitHub repository.
2. Click **Add file** > **Create new file**.
3. In the "Name your file" box, type exactly this:
   `.github/workflows/deploy.yml`
   *(GitHub will automatically create the folders for you)*.
4. Copy the code from the `deploy.yml` file in this chat and paste it into the editor.
5. Click **Commit changes**.
6. **Now check the "Actions" tab.** You will see it running!

## 🔐 Admin Access
To see the **Share** button and get your embed code, add `?admin=true` to the end of your website URL. 
Example: `https://yourname.github.io/my-calendar/?admin=true`

## 🚀 How to Host
1. Upload all project files to GitHub.
2. Ensure the `.github/workflows/deploy.yml` file exists (see above).
3. Once the action is finished (green check), go to **Settings > Pages** and set the Branch to `gh-pages`.
