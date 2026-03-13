import React from 'react';
import Header from '../components/Layout/Header';
import NewsLetter from '../components/Sections/NewsLetter';
import Footer from '../components/Layout/Footer';
import Portfolio from '../components/Sections/Portfolio';

// const PENDING_PROJECT_KEY = 'pending_invest_project_id';

const InvestmentPage = () => {
    // const navigate = useNavigate();
    // const [projects, setProjects] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState('');

    // useEffect(() => {
    //     const run = async () => {
    //         setLoading(true);
    //         setError('');
    //         try {
    //             const response = await fetch(API_ENDPOINTS.PROJECTS, {
    //                 headers: { Accept: 'application/json' },
    //             });
    //             const data = await response.json().catch(() => ({}));
    //             if (!response.ok) {
    //                 throw new Error(data?.message || 'Failed to load projects.');
    //             }
    //             setProjects(Array.isArray(data?.projects) ? data.projects : []);
    //         } catch (err) {
    //             setError(err.message || 'Failed to load projects.');
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     run();
    // }, []);

    // const handleInvestNow = (project) => {
    //     if (!project?.active_offering?.id || !project?.active_offering?.is_active) {
    //         return;
    //     }

    //     const token = localStorage.getItem('auth_token');
    //     if (!token) {
    //         sessionStorage.setItem(PENDING_PROJECT_KEY, String(project.id));
    //         navigate('/login');
    //         return;
    //     }

    //     navigate(`/dashboard/invest?project=${project.id}`);
    // };

    return (
        <div className="bg-gray-100 min-h-screen">
            <section className='relative w-full'>
                <Header forceSolid />

                <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 pt-20">
                    {/* <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                            Access the Power of Renewable Energy
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600">
                            Clean, Contracted, Monthly Dividends
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <div className="text-center py-12 text-gray-500">Loading projects...</div>
                    ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {projects.map((project) => {
                            const canInvest = Boolean(project?.active_offering?.id && project?.active_offering?.is_active);
                            return (
                            <div
                                key={project.id}
                                className="rounded-3xl p-8 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
                            >
                                <h3 className="text-xl font-semibold text-gray-900 mb-6 min-h-[3rem]">
                                    {project.name}
                                </h3>

                                <div className="mb-6">
                                    <div className="text-5xl font-bold text-gray-900 mb-2">
                                        {Number(project.expected_return || 0).toFixed(1)}%
                                    </div>
                                    <div className="text-sm font-medium text-gray-600">
                                        Annual Target Return
                                    </div>
                                </div>

                                <div className="text-sm text-gray-600 mb-6 space-y-1">
                                    <p>Daily Return: <span className="font-medium">{Number(project.daily_return || 0).toFixed(2)}%</span></p>
                                    <p>Type: <span className="capitalize font-medium">{project.type}</span></p>
                                    <p>Duration: {project.duration_label || `${project.duration_months} months`}</p>
                                </div>

                                <button
                                    onClick={() => handleInvestNow(project)}
                                    disabled={!canInvest}
                                    className="w-full py-4 px-6 rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-300 group text-[12px] cursor-pointer bg-(--deep-black) text-white hover:bg-(--solar-gold) hover:text-black disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    INVEST NOW
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        );})}
                    </div>
                    )} */}

                    <Portfolio />
                </div>

            </section>

            <NewsLetter />

            <Footer />
        </div>
    );
};

export default InvestmentPage;
