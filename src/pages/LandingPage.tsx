<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ValueProp PWA - Design Your Value Proposition</title>
    <style>
        /* Base styles */
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #2C3E50;
            margin: 0;
            padding: 0;
            background-color: #fff;
        }
        .container {
            width: 90%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        h1, h2, h3 {
            font-family: 'Comic Sans MS', cursive;
            color: #2C3E50;
        }
        .btn {
            display: inline-block;
            background-color: #E74C3C;
            color: #fff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s;
        }
        .btn:hover {
            background-color: #C0392B;
        }

        /* Header styles */
        header {
            background-color: #fff;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 1000;
        }
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #2C3E50;
        }
        .nav-links {
            display: flex;
            gap: 20px;
        }
        .nav-links a {
            color: #2C3E50;
            text-decoration: none;
        }
        .language-switcher select {
            padding: 5px;
            border: 1px solid #C5D9F1;
            border-radius: 5px;
        }

        /* Hero section styles */
        .hero {
            background-color: #C5D9F1;
            padding: 100px 0 50px;
            text-align: center;
        }
        .hero h1 {
            font-size: 48px;
            margin-bottom: 20px;
        }
        .hero p {
            font-size: 24px;
            margin-bottom: 30px;
        }
        .hero-image {
            max-width: 100%;
            height: auto;
            margin-top: 30px;
        }

        /* Features section styles */
        .features {
            padding: 50px 0;
            background-color: #fff;
        }
        .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
        }
        .feature {
            text-align: center;
            padding: 20px;
            background-color: #f8f9fa;
            border-radius: 10px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .feature-icon {
            font-size: 48px;
            margin-bottom: 20px;
        }

        /* Visual demo styles */
        .visual-demo {
            padding: 50px 0;
            background-color: #C5D9F1;
            text-align: center;
        }
        .demo-video {
            max-width: 100%;
            height: auto;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }

        /* Testimonials styles */
        .testimonials {
            padding: 50px 0;
            background-color: #fff;
        }
        .testimonial-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
        }
        .testimonial {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .testimonial img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            margin-right: 15px;
            float: left;
        }

        /* Pricing plans styles */
        .pricing {
            padding: 50px 0;
            background-color: #C5D9F1;
        }
        .pricing-table {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
        }
        .pricing-plan {
            background-color: #fff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            text-align: center;
        }
        .plan-price {
            font-size: 36px;
            font-weight: bold;
            margin: 20px 0;
        }

        /* FAQ styles */
        .faq {
            padding: 50px 0;
            background-color: #fff;
        }
        .faq-item {
            margin-bottom: 20px;
        }
        .faq-question {
            background-color: #f8f9fa;
            padding: 15px;
            cursor: pointer;
            border-radius: 5px;
            transition: background-color 0.3s;
        }
        .faq-question:hover {
            background-color: #e9ecef;
        }
        .faq-answer {
            padding: 15px;
            display: none;
        }

        /* Final CTA styles */
        .final-cta {
            padding: 100px 0;
            background-color: #2C3E50;
            color: #fff;
            text-align: center;
        }
        .final-cta h2 {
            color: #fff;
            font-size: 36px;
            margin-bottom: 20px;
        }

        /* Footer styles */
        footer {
            background-color: #2C3E50;
            color: #fff;
            padding: 50px 0;
        }
        .footer-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 30px;
        }
        .footer-links h3 {
            color: #fff;
            margin-bottom: 20px;
        }
        .footer-links ul {
            list-style-type: none;
            padding: 0;
        }
        .footer-links ul li {
            margin-bottom: 10px;
        }
        .footer-links ul li a {
            color: #C5D9F1;
            text-decoration: none;
        }
        .social-links a {
            color: #fff;
            font-size: 24px;
            margin-right: 15px;
        }

        /* Responsive design */
        @media (max-width: 768px) {
            .nav-links {
                display: none;
            }
            .hero h1 {
                font-size: 36px;
            }
            .hero p {
                font-size: 18px;
            }
        }
    </style>
</head>
<body>
    <header>
        <nav class="container">
            <div class="logo">ValueProp PWA</div>
            <div class="nav-links">
                <a href="#features">Features</a>
                <a href="#demo">Demo</a>
                <a href="#pricing">Pricing</a>
                <a href="#faq">FAQ</a>
            </div>
            <div class="language-switcher">
                <select>
                    <option value="en">🇬🇧 English</option>
                    <option value="es">🇪🇸 Español</option>
                    <option value="fr">🇫🇷 Français</option>
                </select>
            </div>
            <a href="#" class="btn">Download App</a>
        </nav>
    </header>

    <main>
        <section class="hero">
            <div class="container">
                <h1>Design Your Value Proposition</h1>
                <p>Create, test, and refine your value proposition with our intuitive canvas tool.</p>
                <a href="#" class="btn">Get Started</a>
                <img src="hero-image.png" alt="ValueProp PWA in action" class="hero-image">
            </div>
        </section>

        <section id="features" class="features">
            <div class="container">
                <h2>Key Features</h2>
                <div class="feature-grid">
                    <div class="feature">
                        <div class="feature-icon">📊</div>
                        <h3>Value Mapping</h3>
                        <p>Easily map and visualize your value propositions.</p>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">🎯</div>
                        <h3>Customer Profiling</h3>
                        <p>Create detailed customer profiles to understand your audience better.</p>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">🧪</div>
                        <h3>Hypothesis Testing</h3>
                        <p>Test your business assumptions with built-in experimentation tools.</p>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">📈</div>
                        <h3>Progress Tracking</h3>
                        <p>Monitor your business model evolution over time.</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="demo" class="visual-demo">
            <div class="container">
                <h2>See ValueProp PWA in Action</h2>
                <video class="demo-video" controls>
                    <source src="demo-video.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
        </section>

        <section class="testimonials">
            <div class="container">
                <h2>What Our Users Say</h2>
                <div class="testimonial-grid">
                    <div class="testimonial">
                        <img src="user1.jpg" alt="Sarah Johnson">
                        <p>"ValueProp PWA has revolutionized how we approach our value proposition. It's intuitive and powerful!"</p>
                        <p><strong>Sarah Johnson</strong>, CEO at TechStart</p>
                    </div>
                    <div class="testimonial">
                        <img src="user2.jpg" alt="Michael Chen">
                        <p>"The visual approach of this tool helped us identify gaps in our offering we never knew existed."</p>
                        <p><strong>Michael Chen</strong>, Product Manager at InnovateCorp</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="pricing" class="pricing">
            <div class="container">
                <h2>Pricing Plans</h2>
                <div class="pricing-table">
                    <div class="pricing-plan">
                        <h3>Basic</h3>
                        <p class="plan-price">$9.99/mo</p>
                        <ul>
                            <li>1 User</li>
                            <li>5 Projects</li>
                            <li>Basic Analytics</li>
                            <li>Email Support</li>
                        </ul>
                        <a href="#" class="btn">Choose Basic</a>
                    </div>
                    <div class="pricing-plan">
                        <h3>Pro</h3>
                        <p class="plan-price">$29.99/mo</p>
                        <ul>
                            <li>5 Users</li>
                            <li>Unlimited Projects</li>
                            <li>Advanced Analytics</li>
                            <li>Priority Support</li>
                            <li>API Access</li>
                        </ul>
                        <a href="#" class="btn">Choose Pro</a>
                    </div>
                    <div class="pricing-plan">
                        <h3>Enterprise</h3>
                        <p class="plan-price">Custom</p>
                        <ul>
                            <li>Unlimited Users</li>
                            <li>Unlimited Projects</li>
                            <li>Custom Analytics</li>
                            <li>24/7 Support</li>
                            <li>API Access</li>
                            <li>Custom Integrations</li>
                        </ul>
                        <a href="#" class="btn">Contact Sales</a>
                    </div>
                </div>
            </div>
        </section>

        <section id="faq" class="faq">
            <div class="container">
                <h2>Frequently Asked Questions</h2>
                <div class="faq-item">
                    <div class="faq-question">What is a Value Proposition Canvas?</div>
                    <div class="faq-answer">A Value Proposition Canvas is a tool to ensure that a product or service is positioned around what the customer values and needs. It helps businesses to design products and services that customers want.</div>
                </div>
                <div class="faq-item">
                    <div class="faq-question">How does this app differ from traditional business planning tools?</div>
                    <div class="faq-answer">Our app brings the Value Proposition Canvas to life with interactive features, real-time collaboration, and AI-powered insights. It's designed to be more dynamic and user-friendly than traditional business planning tools.</div>
                </div>
                <div class="faq-item">
                    <div class="faq-question">Can I use this app for multiple projects?</div>
                    <div class="faq-answer">Yes! Depending on your plan, you can manage multiple projects within the app. This allows you to create and compare value propositions for different products or customer segments.</div>
                </div>
                <div class="faq-item">
                    <div class="faq-question">Is my data secure?</div>
                    <div class="faq-answer">Absolutely. We use industry-standard encryption and security practices to ensure your data is safe. We never share your information with third parties.</div>
                </div>
            </div>
        </section>

        <section class="final-cta">
            <div class="container">
                <h2>Ready to Transform Your Value Proposition?</h2>
                <p>Join thousands of businesses already using ValueProp PWA to create winning strategies.</p>
                <a href="#" class="btn">Download ValueProp PWA Now</a>
            </div>
        </section>
    </main>

    <footer>
        <div class="container">
            <div class="footer-grid">
                <div class="footer-links">
                    <h3>Product</h3>
                    <ul>
                        <li><a href="#">Features</a></li>
                        <li><a href="#">Pricing</a></li>
                        <li><a href="#">FAQ</a></li>
                    </ul>
                </div>
                <div class="footer-links">
                    <h3>Company</h3>
                    <ul>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-links">
                    <h3>Legal</h3>
                    <ul>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                    </ul>
                </div>
                <div class="footer-links">
                    <h3>Connect</h3>
                    <div class="social-links">
                        <a href="#" aria-label="Facebook">📘</a>
                        <a href="#" aria-label="Twitter">🐦</a>
                        <a href="#" aria-label="LinkedIn">🔗</a>
                        <a href="#" aria-label="Instagram">📷</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <script>
        // Simple FAQ toggle functionality
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
            });
        });

        // Language switcher functionality (placeholder)
        document.querySelector('.language-switcher select').addEventListener('change', (e) => {
            console.log(`Language changed to: ${e.target.value}`);
            // Here you would typically implement the actual language switching logic
        });
    </script>
</body>
</html>