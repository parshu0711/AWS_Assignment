# AWS EC2 & IAM Configuration Assignment

## 🌐 Deployed Project
**Project Link:** [http://13.53.34.107/](http://13.53.34.107/)
*(Hosted on an Ubuntu EC2 instance using Nginx and an Elastic IP)*

---

## 📸 Assignment Screenshots

### 1. EC2 Instance (AWS Console)
*Screenshot showing the running EC2 instance with the admin username visible:*
![EC2 Instance](./ec2-running.png)

### 2. User 1 - No Permissions
*Screenshot showing login as **User 1**, resulting in "Access Denied" when attempting to view the EC2 dashboard:*
![User 1 Login](./user1-no-permissions.png)

### 3. User 2 - EC2 Full Access
*Screenshot showing login as **User 2**, successfully viewing the EC2 instances:*
![User 2 Login](./user2-ec2-access.png)

---

## 🧗 Challenges and Issues Faced
- **Elastic IP Configuration:** Understanding the difference between stopping/starting an EC2 instance and how a generic public IP changes versus keeping a persistent Elastic IP.
- **Navigating IAM Profiles:** Navigating the AWS UI differences specifically around assigning policies manually versus creating user groups. 
- **IAM Testing:** Ensuring that the main admin AWS session wasn't interrupted by using an incognito window to properly verify the "Access Denied" errors for User 1 and the successful read for User 2.
