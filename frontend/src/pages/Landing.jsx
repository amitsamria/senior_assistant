import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
                <div className="inline-block p-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-4 shadow-glass">
                    <span className="text-4xl">🌿</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-bold font-serif tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-white">
                    Senior Assistant
                </h1>

                <p className="text-xl md:text-2xl text-secondary max-w-2xl mx-auto leading-relaxed">
                    Your trusted companion for daily wellness. Manage medications, appointments, and cognitive health with elegance and ease.
                </p>

                <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-12">
                    <Link
                        to="/login"
                        className="btn-large bg-primary hover:bg-primaryDark text-white border-none shadow-lg hover:shadow-primary/50 transform hover:-translate-y-1"
                    >
                        Get Started
                    </Link>
                    <a
                        href="#"
                        className="px-8 py-4 text-xl font-medium text-white/70 hover:text-white transition-colors"
                    >
                        Learn More
                    </a>
                </div>
            </div>

            <footer className="absolute bottom-8 text-white/30 text-sm">
                © 2025 Senior Assistant. Designed for Care.
            </footer>
        </div>
    );
};

export default Landing;
