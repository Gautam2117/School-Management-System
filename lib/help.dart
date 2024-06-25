import 'package:flutter/material.dart';

class HelpScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Help'),
        backgroundColor: Colors.deepPurpleAccent,
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _buildSectionTitle('Getting Started'),
            _buildHelpItem(
              title: 'How to Login?',
              content:
              'To login, use your registered email address and password. If you forgot your password, click on the "Forgot Password?" link to reset it.',
              imageUrl: 'assets/login.jpeg',
            ),
            _buildHelpItem(
              title: 'How to Register?',
              content:
              'If you are new, click on the "Register" button on the login screen. Fill in the required information and submit the form.',
              imageUrl: 'assets/register.jpeg',
            ),
            _buildSectionTitle('Account Management'),
            _buildHelpItem(
              title: 'How to Update Profile?',
              content:
              'Navigate to your profile page and click on the "Edit Profile" button. Update your information and click "Save" to apply changes.',
              imageUrl: 'assets/update_profile.jpeg',
            ),
            _buildHelpItem(
              title: 'How to Change Password?',
              content:
              'Go to your profile settings and choose the "Change Password" option. Enter your current password and set a new one.',
              imageUrl: 'assets/change_pass.jpeg',
            ),
            _buildSectionTitle('Course Enrollment'),
            _buildHelpItem(
              title: 'How to Enroll in Courses?',
              content:
              'Visit the Courses section, browse available courses, and click on "Enroll" for the courses you wish to join. Follow any additional instructions if provided.',
              imageUrl: 'assets/enroll.jpeg',
            ),
            _buildSectionTitle('Support'),
            _buildHelpItem(
              title: 'Contact Support',
              content:
              'For any further assistance or questions, please contact our support team at support@yourschool.com or call +1234567890.',
              imageUrl: 'assets/support.jpeg',
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 12.0),
      child: Text(
        title,
        style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
      ),
    );
  }

  Widget _buildHelpItem(
      {required String title, required String content, required String imageUrl}) {
    return Card(
      elevation: 3,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      margin: EdgeInsets.symmetric(vertical: 8.0),
      child: Padding(
        padding: EdgeInsets.all(16.0),
        child: LayoutBuilder(
          builder: (context, constraints) {
            // Determine the maximum width available for the card
            double maxWidth = constraints.maxWidth;

            return Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  flex: 3,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        title,
                        style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                      ),
                      SizedBox(height: 10),
                      Text(
                        content,
                        style: TextStyle(fontSize: 14),
                      ),
                    ],
                  ),
                ),
                SizedBox(width: 16.0), // Adjust spacing between text and image
                ConstrainedBox(
                  constraints: BoxConstraints(maxHeight: 120, maxWidth: maxWidth * 0.25),
                  child: imageUrl.isNotEmpty
                      ? Image.asset(
                    imageUrl,
                    fit: BoxFit.contain,
                  )
                      : SizedBox.shrink(),
                ),
              ],
            );
          },
        ),
      ),
    );
  }
}