import 'package:flutter/material.dart';

class AboutUsPage extends StatefulWidget {
  @override
  _AboutUsPageState createState() => _AboutUsPageState();
}

class _AboutUsPageState extends State<AboutUsPage> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: Duration(seconds: 1),
    );
    _animation = CurvedAnimation(parent: _controller, curve: Curves.easeInOut);
    _controller.forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('About Us'),
        backgroundColor: Colors.deepPurpleAccent,
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            FadeTransition(
              opacity: _animation,
              child: _buildHeader(),
            ),
            SizedBox(height: 20),
            SlideTransition(
              position: Tween<Offset>(begin: Offset(-1, 0), end: Offset.zero).animate(_animation),
              child: _buildFeatureCard(
                icon: Icons.school,
                title: 'Our Mission',
                description:
                'Welcome to [School Name], we are dedicated to fostering a nurturing and stimulating environment where every student can thrive academically, socially, and emotionally. Our mission is to cultivate a love of learning and empower our students to become confident, responsible, and compassionate members of society.',
              ),
            ),
            SizedBox(height: 20),
            SlideTransition(
              position: Tween<Offset>(begin: Offset(1, 0), end: Offset.zero).animate(_animation),
              child: _buildFeatureCard(
                icon: Icons.star,
                title: 'Our Vision',
                description:
                'Thoughts and ideas have the power to change the world. We believe that everyone has unique insights and perspectives and our school is a place where students can present their thoughts creatively and exchange their knowledge openly among each other. We strive to be a community where students are inspired to achieve their full potential and become lifelong learners. We believe in providing a holistic education that balances academic excellence with personal growth.',
              ),
            ),
            SizedBox(height: 20),
            SlideTransition(
              position: Tween<Offset>(begin: Offset(-1, 0), end: Offset.zero).animate(_animation),
              child: _buildFeatureCard(
                icon: Icons.group,
                title: 'Our Values',
                description:
                'We promote honesty and strong moral principles to ensure integrity among the students. We encourage respect for self, others, and our environment. We believe in the power of working together to achieve common goals and ensure collaboration. Teamwork also encourages coordination between students. We celebrate diversity and ensure an inclusive environment for all.',
              ),
            ),
            SizedBox(height: 20),
            SlideTransition(
              position: Tween<Offset>(begin: Offset(1, 0), end: Offset.zero).animate(_animation),
              child: _buildFeatureCard(
                icon: Icons.location_on,
                title: 'Our Programs',
                description:
                'Our school also offers extra-curricular activities by promoting: Art and Music learning, Physical Education and sports, Social and environmental activities and plantation drives.',
              ),
            ),
            SizedBox(height: 20),
            SlideTransition(
              position: Tween<Offset>(begin: Offset(1, 0), end: Offset.zero).animate(_animation),
              child: _buildFeatureCard(
                icon: Icons.location_on,
                title: 'Join Us',
                description:
                'We invite you to explore our school, meet our passionate educators, and see first-hand the opportunities we offer. Whether you are a prospective student, parent, or educator, we welcome you to be a part of our [School Name] family.',
              ),
            ),
            SizedBox(height: 20),
            FadeTransition(
              opacity: _animation,
              child: _buildContactCard(),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Container(
      decoration: BoxDecoration(
        color: Colors.deepPurpleAccent,
        borderRadius: BorderRadius.circular(10),
        boxShadow: [
          BoxShadow(
            color: Colors.deepPurple.withOpacity(0.5),
            spreadRadius: 3,
            blurRadius: 7,
            offset: Offset(0, 3),
          ),
        ],
      ),
      padding: EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Hero(
            tag: 'schoolLogo',
            child: Image.asset(
              'assets/school_logo.jpeg',
              height: 150,
              fit: BoxFit.contain,
            ),
          ),
          SizedBox(height: 20),
          Text(
            'Welcome to Our School',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white),
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 10),
          Text(
            'Where Learning Meets Excellence',
            style: TextStyle(fontSize: 18, fontStyle: FontStyle.italic, color: Colors.white),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildFeatureCard({required IconData icon, required String title, required String description}) {
    return Card(
      elevation: 3,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      child: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(icon, size: 30, color: Colors.deepPurpleAccent),
                SizedBox(width: 10),
                Text(
                  title,
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                ),
              ],
            ),
            SizedBox(height: 10),
            Text(
              description,
              style: TextStyle(fontSize: 16),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildContactCard() {
    return Card(
      elevation: 3,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(10),
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Colors.deepPurpleAccent, Colors.deepPurple],
          ),
        ),
        child: Padding(
          padding: EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Contact Us',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white),
              ),
              SizedBox(height: 10),
              ListTile(
                leading: Icon(Icons.phone, color: Colors.green),
                title: Text('Phone: +1234567890', style: TextStyle(color: Colors.white)),
              ),
              ListTile(
                leading: Icon(Icons.email, color: Colors.orange),
                title: Text('Email: info@ourschool.com', style: TextStyle(color: Colors.white)),
              ),
              ListTile(
                leading: Icon(Icons.location_on, color: Colors.red),
                title: Text('Address: 123 School Avenue, City, Country', style: TextStyle(color: Colors.white)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}