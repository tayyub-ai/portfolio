import React, { useEffect, useState } from 'react';
import {
  Loader2, Code2, Database, LineChart, Users, Brain, Server, Globe,
  Smartphone, Gamepad2, Wrench, Terminal, CircuitBoard, Zap, Cpu,
  Cloud, Layout, Layers, X
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePortfolio } from '@/hooks/PortfolioContext';
import { SECTION_NUMBERS } from '@/config/env';

// Map category names to icons
const getCategoryIcon = (category: string) => {
  const icons: Record<string, React.ReactNode> = {
    'Frontend': <Layout size={20} className="text-yellow-400" />,
    'Backend': <Server size={20} className="text-green-400" />,
    'DevOps': <Globe size={20} className="text-blue-400" />,
    'Mobile': <Smartphone size={20} className="text-purple-400" />,
    'Data/AI': <Brain size={20} className="text-pink-400" />,
    'AI': <Brain size={20} className="text-pink-400" />,
    'Cloud': <Cloud size={20} className="text-blue-400" />,
    'Systems': <Cpu size={20} className="text-orange-400" />,
    'Architecture': <Layers size={20} className="text-cyan-400" />,
    'Soft Skills': <Users size={20} className="text-orange-400" />,
    'Tools': <Wrench size={20} className="text-cyan-400" />,
    'Game Development': <Gamepad2 size={20} className="text-red-400" />,
  };
  return icons[category] || <Database size={20} className="text-darktech-holo-cyan" />;
};

const TechStack = () => {
  const { portfolio, isLoading, error } = usePortfolio();
  const [showTechModal, setShowTechModal] = useState<boolean>(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const animationControls = useAnimation();

  // ✅ Use your portfolio.json data
  const techStackWithIcons = portfolio?.techStack || [];

  const hasNoData = !techStackWithIcons || techStackWithIcons.length === 0;

  const techStackByCategory = techStackWithIcons.reduce((acc: Record<string, typeof techStackWithIcons>, tech) => {
    const category = (tech as any).category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(tech);
    return acc;
  }, {});

  // Animation logic
  useEffect(() => {
    if (inView) animationControls.start('visible');
  }, [inView, animationControls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 10 } },
  };

  if (isLoading) {
    return (
      <section id="tech-stack" className="py-20 text-center">
        <h2 className="text-4xl font-bold mb-8">Tech Stack</h2>
        <Loader2 className="animate-spin mx-auto text-darktech-neon-green" size={48} />
        <p className="text-darktech-muted mt-4">Analyzing tech profile...</p>
      </section>
    );
  }

  if (error || hasNoData) {
    return (
      <section id="tech-stack" className="py-20 text-center">
        <h2 className="text-4xl font-bold mb-8">Tech Stack</h2>
        <p className="text-darktech-muted">No tech stack data found.</p>
      </section>
    );
  }

  return (
    <motion.section
      id="tech-stack"
      className="py-20 relative overflow-hidden"
      ref={ref}
      initial="hidden"
      animate={animationControls}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          variants={itemVariants}
        >
          <h2 className="text-5xl font-bold mb-2 inline-flex items-center gap-3">
            <CircuitBoard className="text-darktech-neon-green h-8 w-8" />
            <span>Tech Stack</span>
          </h2>
          <p className="text-darktech-muted mt-4 max-w-2xl mx-auto">
            Tools, frameworks, and platforms I work with regularly.
          </p>
        </motion.div>

        {/* ✅ Visible Tech Stack Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-center">
          {techStackWithIcons.map((tech, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center p-3 bg-darktech-card/20 hover:bg-darktech-card/40 border border-darktech-border/40 hover:border-darktech-neon-green/30 rounded-xl transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              {tech.icon ? (
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="h-12 w-12 mb-2 object-contain"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
              ) : (
                <Code2 className="text-darktech-neon-green h-10 w-10 mb-2" />
              )}
              <p className="text-sm font-medium text-center text-gray-200 group-hover:text-darktech-neon-green transition-colors">
                {tech.name}
              </p>
              {(tech as any).category && (
                <p className="text-xs text-gray-400 mt-1 text-center">
                  {(tech as any).category}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* 🔘 Modal Button */}
        <motion.div className="text-center mt-12" variants={itemVariants}>
          <Dialog open={showTechModal} onOpenChange={setShowTechModal}>
            <DialogTrigger asChild>
              <Button
                variant="default"
                className="bg-darktech-card hover:bg-darktech-card/90 border-2 border-darktech-neon-green text-darktech-neon-green font-medium px-6 py-6 text-lg relative group overflow-hidden"
              >
                <Code2 className="mr-2 h-5 w-5 animate-pulse" />
                View Complete Tech Stack
              </Button>
            </DialogTrigger>

            {/* ✅ Modal */}
            <DialogContent className="sm:max-w-4xl max-h-[85vh] bg-darktech-background border border-darktech-border rounded-xl overflow-hidden">
              <DialogHeader className="border-b border-darktech-border p-4">
                <DialogTitle className="text-2xl font-bold text-center flex justify-center items-center gap-3">
                  <Terminal size={20} className="text-darktech-neon-green" />
                  <span>Complete Tech Stack</span>
                </DialogTitle>
                <DialogDescription className="text-darktech-muted text-center font-mono">
                  &lt; Tools, frameworks, and technologies I use /&gt;
                </DialogDescription>
              </DialogHeader>

              <div className="overflow-y-auto flex-grow mt-4 p-4 custom-scrollbar">
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="w-full flex flex-wrap justify-center mb-4 bg-darktech-card/20 sticky top-0 z-10 px-2">
                    <TabsTrigger value="all" className="data-[state=active]:bg-darktech-card data-[state=active]:text-darktech-neon-green">
                      All
                    </TabsTrigger>
                    {Object.keys(techStackByCategory).map((category) => (
                      <TabsTrigger
                        key={category}
                        value={category}
                        className="data-[state=active]:bg-darktech-card data-[state=active]:text-darktech-neon-green"
                      >
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <TabsContent value="all" className="p-2">
                    <motion.div
                      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {techStackWithIcons.map((tech, index) => (
                        <motion.div
                          key={index}
                          className="flex flex-col items-center p-3 hover:scale-110 transition-all rounded-lg bg-darktech-card/30 hover:bg-darktech-card/60 border border-darktech-border/30 hover:border-darktech-neon-green/30 group"
                          variants={itemVariants}
                        >
                          {tech.icon ? (
                            <img
                              src={tech.icon}
                              alt={tech.name}
                              className="h-12 w-12 mb-2 object-contain"
                            />
                          ) : (
                            <Code2 size={32} className="text-darktech-neon-green mb-2" />
                          )}
                          <span className="text-sm font-medium text-center text-gray-200 group-hover:text-darktech-neon-green transition-colors">
                            {tech.name}
                          </span>
                          {(tech as any).category && (
                            <span className="text-xs text-gray-400 mt-1 opacity-70 text-center">
                              {(tech as any).category}
                            </span>
                          )}
                        </motion.div>
                      ))}
                    </motion.div>
                  </TabsContent>

                  {Object.entries(techStackByCategory).map(([category, techs]) => (
                    <TabsContent key={category} value={category} className="p-2">
                      <motion.div
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {techs.map((tech, index) => (
                          <motion.div
                            key={index}
                            className="flex flex-col items-center p-3 hover:scale-110 transition-all rounded-lg bg-darktech-card/30 hover:bg-darktech-card/60 border border-darktech-border/30 hover:border-darktech-neon-green/30 group"
                            variants={itemVariants}
                          >
                            {tech.icon ? (
                              <img
                                src={tech.icon}
                                alt={tech.name}
                                className="h-12 w-12 mb-2 object-contain"
                              />
                            ) : (
                              <Code2 size={32} className="text-darktech-neon-green mb-2" />
                            )}
                            <span className="text-sm font-medium text-center text-gray-200 group-hover:text-darktech-neon-green transition-colors">
                              {tech.name}
                            </span>
                            {(tech as any).category && (
                              <span className="text-xs text-gray-400 mt-1 opacity-70 text-center">
                                {(tech as any).category}
                              </span>
                            )}
                          </motion.div>
                        ))}
                      </motion.div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>

              <div className="text-center py-4 border-t border-darktech-border">
                <Button
                  onClick={() => setShowTechModal(false)}
                  className="bg-darktech-card hover:bg-darktech-card/90 border border-darktech-neon-green/50 hover:border-darktech-neon-green text-darktech-neon-green font-medium px-8"
                >
                  <X className="mr-2 h-4 w-4" />
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TechStack;
