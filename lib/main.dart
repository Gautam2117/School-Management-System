import 'package:flutter/material.dart';
import 'admin.dart';
import 'finance.dart';
import 'teacher.dart';
import 'student.dart';
import 'aboutus.dart';
import 'help.dart';
import 'studentlogin.dart';
import 'adminlogin.dart';
import 'teacherlogin.dart';
import 'financelogin.dart';
import 'studentdashboard.dart';
import 'admindashboard.dart';
import 'tdashboard.dart';

void main() {
  runApp(SchoolManagementApp());
}

class SchoolManagementApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'School Management System',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
        textTheme: TextTheme(
          headlineLarge: TextStyle(fontSize: 32, fontWeight: FontWeight.bold, color: Colors.black),
          headlineSmall: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.black),
          bodyMedium: TextStyle(fontSize: 14, color: Colors.black),
        ),
        cardTheme: CardTheme(
          elevation: 5,
          margin: EdgeInsets.symmetric(vertical: 10, horizontal: 10),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15),
          ),
        ),
      ),
      home: HomePage(),
      routes: {
        '/admin': (context) => SignUpPage(),
        '/adlogin': (context) => ALoginPage(),
        '/teacher': (context) => TeacherUpPage(),
        '/finance': (context) => FinanceUpPage(),
        '/teacherlogin': (context) => TLoginPage(),
        '/flogin': (context) => FLoginPage(),
        '/student': (context) => SSignUpPage(),
        '/slogin': (context) => SLoginPage(),
        '/help': (context) => HelpScreen(),
        '/about': (context) => AboutUsPage(),
        '/admindash': (context) => AdminDashboardPage(
            adminName: 'Nirmita',
            ),
        '/login': (context) => ALoginPage(),
      },
    );
  }
}

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.black,
        title: Text('School Management System', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
        actions: <Widget>[
          TextButton(
              onPressed: () => Navigator.pushNamed(context, '/'),
              child: Text('HOME', style: TextStyle(color: Colors.white))),
          TextButton(
              onPressed: () => Navigator.pushNamed(context, '/admin'),
              child: Text('ADMIN', style: TextStyle(color: Colors.white))),
          TextButton(
              onPressed: () => Navigator.pushNamed(context, '/teacher'),
              child: Text('TEACHER', style: TextStyle(color: Colors.white))),
          TextButton(
              onPressed: () => Navigator.pushNamed(context, '/student'),
              child: Text('STUDENT', style: TextStyle(color: Colors.white))),
          TextButton(
              onPressed: () => Navigator.pushNamed(context, '/about'),
              child: Text('ABOUT US', style: TextStyle(color: Colors.white))),
          TextButton(
              onPressed: () => Navigator.pushNamed(context, '/help'),
              child: Text('HELP', style: TextStyle(color: Colors.white))),
        ],
      ),
      body: Container(
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage('Background.jpeg'),
            fit: BoxFit.cover,
          ),
        ),
        child: Center(
          child: ConstrainedBox(
            constraints: BoxConstraints(maxWidth: 600),
            child: ListView(
              padding: const EdgeInsets.all(20.0),
              children: <Widget>[
                _buildWelcomeSection(),
                SizedBox(height: 20),
                _buildListCard(context, 'Admin', Icons.admin_panel_settings, '/admin', [Colors.green, Colors.lime]),
                SizedBox(height: 20),
                _buildListCard(context, 'Teacher', Icons.school, '/teacher', [Colors.teal, Colors.cyan]),
                SizedBox(height: 20),
                _buildListCard(context, 'Student', Icons.person, '/student', [Colors.pink, Colors.pinkAccent]),
                SizedBox(height: 20),
                _buildListCard(context, 'About Us', Icons.airplay, '/about', [Colors.green, Colors.lightGreen]),
                SizedBox(height: 20),
                _buildListCard(context, 'Help', Icons.help_center, '/help', [Colors.blue, Colors.blueGrey]),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildWelcomeSection() {
    return Card(
      elevation: 5,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(15),
      ),
      child: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Welcome to the School Management System',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 10),
            Text(
              'Please select one of the options below to get started:',
              style: TextStyle(
                fontSize: 16,
                color: Colors.grey[700],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildListCard(BuildContext context, String title, IconData icon, String route, List<Color> gradientColors) {
    return GestureDetector(
      onTap: () => Navigator.pushNamed(context, route),
      child: Card(
        elevation: 5,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(15),
        ),
        child: AnimatedContainer(
          duration: Duration(milliseconds: 300),
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: gradientColors,
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            borderRadius: BorderRadius.circular(15),
            boxShadow: [
              BoxShadow(
                color: Colors.black26,
                blurRadius: 10,
                offset: Offset(0, 5),
              ),
            ],
          ),
          padding: const EdgeInsets.all(20.0),
          child: Row(
            children: <Widget>[
              Icon(icon, size: 40, color: Colors.white),
              SizedBox(width: 20),
              Text(title, style: TextStyle(fontSize: 20, color: Colors.white)),
            ],
          ),
        ),
      ),
    );
  }
}