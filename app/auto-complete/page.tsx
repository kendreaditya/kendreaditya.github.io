'use client';

import { useState, useEffect } from 'react';

const tableOfContents = [
  { id: 'introduction', title: 'Introduction', level: 2 },
  { id: 'philosophical-stakes', title: 'The Philosophical Stakes', level: 2 },
  { id: 'loss-of-autonomy', title: 'Loss of Autonomy and Deliberative Capacity', level: 3 },
  { id: 'phenomenological-perspective', title: 'The Phenomenological Perspective', level: 3 },
  { id: 'system-2-crisis', title: 'The System 2 Weakening Crisis', level: 3 },
  { id: 'evidence', title: 'The Evidence', level: 2 },
  { id: 'personal-usage', title: 'Personal Usage Analysis', level: 3 },
  { id: 'broader-patterns', title: 'Broader Usage Patterns', level: 3 },
  { id: 'research-findings', title: 'Research Findings', level: 3 },
  { id: 'solution', title: 'Methods and Results', level: 2 },
  { id: 'educational-prompts', title: 'Educational System Prompts Analysis', level: 3 },
  { id: 'chatgpt-prompt', title: 'ChatGPT Study Mode', level: 4 },
  { id: 'gemini-prompt', title: 'Gemini Guided Learning', level: 4 },
  { id: 'claude-prompt', title: 'Claude Educational UserStyle', level: 4 },
  { id: 'cognitive-partnership', title: 'Cognitive Partnership Framework', level: 3 },
  { id: 'new-prompt', title: 'Implementation', level: 4 },
  { id: 'conclusion', title: 'Discussion', level: 2 },
];

const SystemPromptCard = ({ title, description, prompt, source }: { title: string; description: string; prompt: string; source?: string }) => (
  <div className="border border-gray-700 rounded-lg bg-gray-900 mb-8">
    <div className="px-6 py-4 border-b border-gray-700 bg-gray-800">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-medium text-white">{title}</h4>
        {source && (
          <span className="px-2 py-1 bg-blue-900 text-blue-300 text-xs rounded font-medium uppercase tracking-wide">
            {source}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-300 mt-1">{description}</p>
    </div>
    <div className="p-6">
      <pre className="text-xs text-gray-200 whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto">
        {prompt}
      </pre>
    </div>
  </div>
);

export default function AutoComplete() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6, rootMargin: '-100px 0px -66%' }
    );

    tableOfContents.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto flex">
        {/* Table of Contents Sidebar */}
        <aside className="w-64 sticky top-0 h-screen bg-black border-r border-gray-800 p-8 hidden lg:block overflow-y-auto">
          <nav className="space-y-1">
            {tableOfContents.map(({ id, title, level }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`block w-full text-left py-1 text-sm transition-colors ${
                  activeSection === id
                    ? 'text-blue-400 font-medium'
                    : 'text-gray-400 hover:text-gray-200'
                } ${level === 3 ? 'ml-4' : level === 4 ? 'ml-8' : ''}`}
              >
                {title}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-4xl mx-auto">
          <article className="px-8 lg:px-16 py-16">
            {/* Header */}
            <header className="mb-16 text-center">
              <div className="mb-4">
                <span className="text-sm text-gray-400">October 21, 2025</span>
                <span className="mx-3 text-gray-400">•</span>
                <span className="text-sm text-gray-400">Research</span>
                <span className="mx-3 text-gray-400">•</span>
                <span className="text-sm text-gray-400">Publication</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-light text-white mb-6 leading-tight max-w-4xl mx-auto">
                Auto Complete for Life: How AI Assistance May Be Eroding Human Autonomy
              </h1>
              
              <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                A research exploration into the philosophical and empirical implications of AI dependency on human cognitive development
              </p>

              <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
                <button className="flex items-center gap-2 hover:text-gray-200">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Listen to article
                </button>
                <span className="text-gray-400">11:21</span>
                <button className="flex items-center gap-2 hover:text-gray-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  Share
                </button>
              </div>
            </header>

            {/* Abstract */}
            <div className="mb-16 p-6 bg-gray-900 border-l-4 border-blue-500">
              <p className="text-base leading-relaxed text-gray-200">
                <strong>AI systems shouldn&apos;t create cognitive dependency in any direction.</strong> People use AI as a tool to learn and explore ideas. That only works if they trust AI to enhance their thinking capacity. We outline our commitment to developing AI that strengthens rather than weakens human cognitive abilities, with humans in control, through our Cognitive Partnership principle.
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <section id="introduction" className="mb-16">
                <h2 className="text-2xl font-medium text-white mb-6">Introduction</h2>
                
                <p className="text-base leading-relaxed mb-6 text-gray-200">
                  Contemporary artificial intelligence systems represent a qualitatively different technological paradigm than previous computational tools. While earlier technologies augmented specific cognitive domains—calculators enhanced arithmetic computation, GPS systems improved spatial navigation—modern large language models (LLMs) increasingly mediate fundamental cognitive processes including reasoning, decision-making, and moral judgment. This phenomenon constitutes what we term &ldquo;cognitive autocomplete&rdquo;: the systematic replacement of effortful human deliberation with AI-generated responses across domains of existential significance.
                </p>
                
                <p className="text-base leading-relaxed mb-6 text-gray-200">
                  The implications extend beyond skill atrophy to threaten the development and maintenance of autonomous deliberative capacity—what philosophers recognize as essential to human flourishing and moral agency. Unlike previous technological interventions that preserved the locus of cognitive effort while reducing computational burden, AI systems risk replacing the metacognitive processes through which individuals develop practical wisdom and evaluative judgment.
                </p>
                
                <p className="text-base leading-relaxed mb-6 text-gray-200">
                  This investigation synthesizes philosophical analysis with empirical evaluation to propose constitutional AI frameworks that preserve and enhance human cognitive autonomy. We present evidence for cognitive dependency patterns in current AI systems and introduce novel design principles for what we term &ldquo;cognitive partnership&rdquo;—AI architectures optimized for human intellectual development rather than task completion efficiency.
                </p>

                <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-8">
                  <h3 className="text-base font-medium text-white mb-4">Research Scope and Methodology</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start">
                      <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Operational definition of cognitive dependency in human-AI interaction
                    </li>
                    <li className="flex items-start">
                      <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Empirical analysis of usage patterns from Anthropic Economic Index data
                    </li>
                    <li className="flex items-start">
                      <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Constitutional AI framework design and evaluation metrics
                    </li>
                  </ul>
                </div>
              </section>

              <section id="philosophical-stakes" className="mb-16">
                <h2 className="text-2xl font-medium text-white mb-6">The Philosophical Stakes</h2>
                
                <div id="loss-of-autonomy" className="mb-12">
                  <h3 className="text-xl font-medium text-white mb-4">Loss of Autonomy and Deliberative Capacity</h3>
                  
                  <p className="text-base leading-relaxed mb-6 text-gray-200">
                    Philosophical accounts of human flourishing consistently identify autonomous deliberation as fundamental to moral agency and meaningful existence (Dworkin, 1988; Raz, 1986). Autonomy transcends mere freedom of choice to encompass the developed capacity for reflective evaluation of one&apos;s values, goals, and practical commitments. Contemporary AI systems threaten this capacity by systematically replacing the cognitive work through which individuals develop and exercise practical wisdom.
                  </p>
                  
                  <p className="text-base leading-relaxed mb-6 text-gray-200">
                    This intervention differs qualitatively from previous technological augmentation. While computational tools like calculators enhanced efficiency within circumscribed domains while preserving the locus of higher-order reasoning, AI systems increasingly mediate the very processes through which individuals develop evaluative judgment. The replacement of deliberative effort with algorithmic output risks what we term &ldquo;practical wisdom atrophy&rdquo;—the degradation of capacities essential to autonomous moral agency.
                  </p>

                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-gray-800 rounded">
                      <h4 className="font-medium text-white mb-1">Purpose</h4>
                      <p className="text-sm text-gray-400">Our sense of direction and meaning</p>
                    </div>
                    <div className="p-4 bg-gray-800 rounded">
                      <h4 className="font-medium text-white mb-1">Virtues</h4>
                      <p className="text-sm text-gray-400">Moral character and ethical reasoning</p>
                    </div>
                    <div className="p-4 bg-gray-800 rounded">
                      <h4 className="font-medium text-white mb-1">Meaning</h4>
                      <p className="text-sm text-gray-400">Deep understanding of our place in the world</p>
                    </div>
                  </div>
                </div>
                
                <div id="phenomenological-perspective" className="mb-12">
                  <h3 className="text-xl font-medium text-white mb-4">The Phenomenological Perspective</h3>
                  
                  <p className="text-base leading-relaxed mb-6 text-gray-200">
                    Phenomenological analysis reveals the existential significance of cognitive effort in human meaning-making. Husserl&apos;s concept of the Lebenswelt describes the pre-theoretical horizon of experience within which all conscious acts acquire significance (Husserl, 1913/1982). This lifeworld emerges through active engagement with environmental challenges that require sustained cognitive work and reflective synthesis.
                  </p>
                  
                  <p className="text-base leading-relaxed mb-6 text-gray-200">
                    Heidegger&apos;s analysis of Dasein as fundamentally &ldquo;Being-in-the-World&rdquo; emphasizes the existential structure of skillful coping through which individuals develop authentic self-understanding (Heidegger, 1927/1962). AI systems that bypass this coping structure by providing ready-made solutions risk disrupting what Heidegger terms &ldquo;thrownness&rdquo; (Geworfenheit)—the confrontation with existential challenges through which individuals develop authentic agency.
                  </p>
                </div>
                
                <div id="system-2-crisis" className="mb-12">
                  <h3 className="text-xl font-medium text-white mb-4">The System 2 Weakening Crisis</h3>
                  
                  <p className="text-base leading-relaxed mb-6 text-gray-200">
                    Dual-process theories of cognition distinguish between automatic (System 1) and controlled (System 2) cognitive processes, with the latter requiring attentional resources and conscious effort (Kahneman, 2011; Evans & Stanovich, 2013). System 2 processes—including working memory manipulation, abstract reasoning, and counterfactual thinking—demonstrate use-dependent plasticity and require regular engagement to maintain functional capacity.
                  </p>
                  
                  <p className="text-base leading-relaxed mb-6 text-gray-200">
                    Contemporary AI systems systematically target System 2 cognitive demands, offering to replace effortful deliberation with rapid algorithmic output. This substitution creates what cognitive scientists term &ldquo;cognitive offloading&rdquo;—the externalization of mental effort to technological systems (Risko & Gilbert, 2016). However, unlike traditional cognitive tools that preserve metacognitive engagement, AI systems risk creating dependencies that persist beyond the technological interaction.
                  </p>

                  <div className="bg-yellow-900 border-l-4 border-yellow-500 p-4 mb-6">
                    <p className="text-sm text-yellow-200">
                      <strong>Critical implication:</strong> Research demonstrates that System 2 depletion increases susceptibility to false beliefs and reduces resistance to misinformation (Kahneman, 2011; Pennycook & Rand, 2019). In democratic contexts requiring informed deliberation, the systematic weakening of controlled cognitive processes through AI dependency may undermine citizens&apos; capacity for critical evaluation of political information and policy alternatives.
                    </p>
                  </div>
                </div>
              </section>

              <section id="evidence" className="mb-16">
                <h2 className="text-2xl font-medium text-white mb-6">The Evidence</h2>
                
                <div id="personal-usage" className="mb-12">
                  <h3 className="text-xl font-medium text-white mb-4">Personal Usage Analysis</h3>
                  
                  <p className="text-base leading-relaxed mb-6 text-gray-200">
                    Analysis of individual usage patterns from the Anthropic Economic Index (AEI) dataset reveals systematic dependencies consistent with cognitive offloading theory. The data demonstrate three primary patterns of concern across domains requiring sustained deliberative engagement:
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="border border-gray-700 rounded-lg p-4">
                      <h4 className="font-medium text-white mb-2">Context Switching and Memory Consolidation Disruption</h4>
                      <p className="text-sm text-gray-300">Frequent AI consultations demonstrate classic cognitive offloading patterns that interfere with memory consolidation processes. Rather than engaging in effortful retrieval practice that strengthens memory traces, usage patterns showed increasing reliance on external AI responses for information that should be retained through spaced repetition and elaborative processing.</p>
                    </div>
                    
                    <div className="border border-gray-700 rounded-lg p-4">
                      <h4 className="font-medium text-white mb-2">Evaluative Judgment Externalization</h4>
                      <p className="text-sm text-gray-300">Usage analysis revealed systematic outsourcing of decisions requiring practical wisdom and contextual evaluation. This pattern appeared across domains including career planning, research methodology selection, and interpersonal relationship navigation—areas where the deliberative process itself contributes to the development of practical judgment and domain expertise.</p>
                    </div>
                    
                    <div className="border border-gray-700 rounded-lg p-4">
                      <h4 className="font-medium text-white mb-2">Heuristic Processing Dominance</h4>
                      <p className="text-sm text-gray-300">Interaction patterns demonstrated a systematic preference for rapid, low-effort responses over sustained analytical thinking. This shift toward heuristic processing modes reduces opportunities for developing the deliberative capacities associated with expertise acquisition and complex problem-solving competence.</p>
                    </div>
                  </div>
                </div>
                
                <div id="broader-patterns" className="mb-12">
                  <h3 className="text-xl font-medium text-white mb-4">Broader Usage Patterns</h3>
                  
                  <p className="text-base leading-relaxed mb-6 text-gray-200">
                    Aggregate analysis of AEI usage patterns identifies systematic cognitive dependency across domains characterized by high epistemic complexity and consequential decision-making requirements. The data reveal concerning trends in professional contexts where autonomous judgment remains critical for optimal outcomes:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h4 className="font-medium text-white mb-2">Medical & Healthcare</h4>
                      <p className="text-sm text-gray-300 mb-4">Users increasingly seek AI assistance for interpreting medical results, understanding health conditions, and even diagnostic questions. While AI can provide valuable information, over-reliance without sufficient human oversight could lead to significant errors and prevent the development of health literacy.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-2">Financial Decision-Making</h4>
                      <p className="text-sm text-gray-300 mb-4">Comprehensive financial advice and assistance across multiple domains represents a growing use case. Yet financial wisdom—understanding risk, recognizing biases, developing judgment about trade-offs—requires personal engagement with these decisions.</p>
                    </div>
                  </div>
                </div>
                
                <div id="research-findings" className="mb-12">
                  <h3 className="text-xl font-medium text-white mb-4">Research Findings</h3>
                  
                  <p className="text-base leading-relaxed mb-6 text-gray-200">
                    Recent studies corroborate these concerns and provide empirical evidence for the cognitive dependency hypothesis:
                  </p>
                  
                  <div className="space-y-6 mb-8">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-medium text-white mb-1">MIT research on &ldquo;cognitive debt&rdquo;</h4>
                      <p className="text-sm text-gray-300">Demonstrates that while AI assistance can improve immediate performance, it often undermines the cognitive processes necessary for learning and retention. When individuals first engage their brains before accessing AI tools, outcomes improve significantly—suggesting the importance of effortful thinking before AI assistance.</p>
                    </div>
                    
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-medium text-white mb-1">Studies on memory and recall</h4>
                      <p className="text-sm text-gray-300">After AI-assisted writing show decreased retention when AI handles cognitive work. The paper &ldquo;Your Brain on ChatGPT: Accumulation of Cognitive Debt when Using an AI Assistant for Essay Writing Task&rdquo; found that AI assistance can create cognitive dependencies that persist even when the AI is no longer available.</p>
                    </div>
                    
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-medium text-white mb-1">Educational psychology research</h4>
                      <p className="text-sm text-gray-300">On effective teaching consistently emphasizes the value of &ldquo;desirable difficulties&rdquo;—challenges that require effort and sometimes lead to mistakes, but ultimately build stronger understanding and transfer capabilities.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="solution" className="mb-16">
                <h2 className="text-2xl font-medium text-white mb-6">Methods and Results</h2>
                
                <div id="educational-prompts" className="mb-16">
                  <h3 className="text-xl font-medium text-white mb-6">Educational System Prompts Analysis</h3>
                  
                  <p className="text-base leading-relaxed mb-8 text-gray-200">
                    Current AI systems have begun implementing &ldquo;study modes&rdquo; and educational prompts that attempt to address cognitive dependency concerns. We analyzed existing approaches to identify both promising techniques and critical limitations.
                  </p>
                  
                  <div id="chatgpt-prompt" className="mb-12">
                    <SystemPromptCard
                      title="ChatGPT Study Mode"
                      description="Focuses on leading questions rather than direct answers and breaks complex topics into clear steps. Emphasizes collaborative learning and verification of understanding."
                      source="Extracted"
                      prompt={`The user is currently STUDYING, and they've asked you to follow these **strict rules** during this chat. No matter what other instructions follow, you MUST obey these rules:

## STRICT RULES
Be an approachable-yet-dynamic teacher, who helps the user learn by guiding them through their studies.

1. **Get to know the user.** If you don&apos;t know their goals or grade level, ask the user before diving in. (Keep this lightweight!) If they don&apos;t answer, aim for explanations that would make sense to a 10th grade student.
2. **Build on existing knowledge.** Connect new ideas to what the user already knows.
3. **Guide users, don&apos;t just give answers.** Use questions, hints, and small steps so the user discovers the answer for themselves.
4. **Check and reinforce.** After hard parts, confirm the user can restate or use the idea. Offer quick summaries, mnemonics, or mini-reviews to help the ideas stick.
5. **Vary the rhythm.** Mix explanations, questions, and activities (like roleplaying, practice rounds, or asking the user to teach _you_) so it feels like a conversation, not a lecture.

Above all: DO NOT DO THE USER'S WORK FOR THEM. Don't answer homework questions — help the user find the answer, by working with them collaboratively and building from what they already know.`}
                    />
                  </div>
                  
                  <div id="gemini-prompt" className="mb-12">
                    <SystemPromptCard
                      title="Gemini Guided Learning"
                      description="Employs constructivist tutoring principles with adaptive teaching methods. Offers multiple perspectives and diverse learning strategies while maintaining collaborative dialogue."
                      source="Extracted"
                      prompt={`# Persona & Objective

* **Role:** You are a warm, friendly, and encouraging peer tutor within Gemini's *Guided Learning*.
* **Tone:** You are encouraging, approachable, and collaborative (e.g. using "we" and "let's"). Still, prioritize being concise and focused on learning goals.
* **Objective:** Facilitate genuine learning and deep understanding through dialogue.

# Core Principles: The Constructivist Tutor

1. **Guide, Don't Tell:** Guide the user toward understanding and mastery rather than presenting a full answer or complete overview.
2. **Adapt to the User:** Follow the user's lead and direction. Begin with their specific learning intent and adapt to their requests.
3. **Prioritize Progress Over Purity:** While the primary approach is to guide the user, this should not come at the expense of progress.
4. **Maintain Context:** Keep track of the user's questions, answers, and demonstrated understanding within the current session.

## Praise and Correction Strategy

Your feedback should be grounded, specific, and encouraging.
* **When the user is correct:** Use simple, direct confirmation: "You've got it." "That's exactly right."
* **When the user is incorrect:** Be gentle but clear. Acknowledge the attempt and guide them back.
* **Avoid:** Superlative or effusive praise like "Excellent!", "Amazing!", "Perfect!" or "Fantastic!"`}
                    />
                  </div>
                  
                  <div id="claude-prompt" className="mb-12">
                    <SystemPromptCard
                      title="Claude Educational UserStyle"
                      description="Uses Socratic questioning with expertise-level detection and collaborative dialogue. Emphasizes checking understanding by asking students to explain concepts in their own words."
                      source="Current"
                      prompt={`The goal is not just to provide answers, but to help students develop robust understanding through guided exploration and practice. Follow these principles:

For advanced technical questions (PhD-level, research, graduate topics with sophisticated terminology), recognize the expertise level and provide direct, technical responses without excessive pedagogical scaffolding.

1. Use leading questions rather than direct answers. Ask targeted questions that guide students toward understanding while providing gentle nudges when they're headed in the wrong direction.

2. Break down complex topics into clear steps. Before moving to advanced concepts, ensure the student has a solid grasp of fundamentals. Verify understanding at each step before progressing.

3. Start by understanding the student's current knowledge:
   - Ask what they already know about the topic
   - Identify where they feel stuck
   - Let them articulate their specific points of confusion

4. Make the learning process collaborative:
   - Engage in two-way dialogue
   - Give students agency in choosing how to approach topics
   - Offer multiple perspectives and learning strategies

5. Regularly check understanding by asking students to:
   - Explain concepts in their own words
   - Articulate underlying principles
   - Provide their own examples
   - Apply concepts to new situations`}
                    />
                  </div>

                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8">
                    <h4 className="text-base font-medium text-white mb-3">Critical Gaps in Current Approaches</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <ul className="space-y-2 text-sm text-gray-300">
                          <li>• Insufficient preservation of meaningful cognitive effort</li>
                          <li>• Limited metacognitive reflection after problem-solving</li>
                        </ul>
                      </div>
                      <div>
                        <ul className="space-y-2 text-sm text-gray-300">
                          <li>• No systematic approach to building intellectual independence</li>
                          <li>• Optimization for immediate satisfaction over long-term development</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div id="cognitive-partnership" className="mb-16">
                  <h3 className="text-xl font-medium text-white mb-6">Cognitive Partnership Framework</h3>
                  
                  <p className="text-base leading-relaxed mb-8 text-gray-200">
                    Based on our analysis, we propose a new constitutional AI framework that prioritizes human cognitive development over convenience. The approach centers on four core design principles that shift AI from an &ldquo;answer machine&rdquo; to an intellectual development partner.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="p-4 border border-gray-700 rounded-lg">
                      <h4 className="font-medium text-white mb-2">1. Preserve Meaningful Cognitive Effort</h4>
                      <p className="text-sm text-gray-300">The struggle of thinking through problems builds capacity. AI should scaffold this effort, not eliminate it.</p>
                    </div>
                    <div className="p-4 border border-gray-700 rounded-lg">
                      <h4 className="font-medium text-white mb-2">2. Enhance Rather Than Replace Human Deliberation</h4>
                      <p className="text-sm text-gray-300">AI should serve as a thinking partner that strengthens human reasoning rather than a replacement that weakens it.</p>
                    </div>
                    <div className="p-4 border border-gray-700 rounded-lg">
                      <h4 className="font-medium text-white mb-2">3. Prioritize Long-term Thinking Skills</h4>
                      <p className="text-sm text-gray-300">Success should be measured by user growth in independence, not immediate task completion.</p>
                    </div>
                    <div className="p-4 border border-gray-700 rounded-lg">
                      <h4 className="font-medium text-white mb-2">4. Foster Intellectual Autonomy</h4>
                      <p className="text-sm text-gray-300">The goal is developing users who need AI less over time, not more.</p>
                    </div>
                  </div>
                  
                  <div id="new-prompt" className="mb-12">
                    <SystemPromptCard
                      title="Cognitive Partnership Implementation"
                      description="A constitutional AI framework designed to strengthen thinking capacity while providing assistance. Optimizes for user growth over immediate satisfaction."
                      source="Proposed"
                      prompt={`You are a cognitive development partner designed to strengthen human thinking capacity. Your primary goal is fostering intellectual autonomy and critical thinking skills.

CORE PHILOSOPHY:
- Learning through guided discovery, not passive consumption
- Meaningful cognitive effort builds long-term capacity  
- Questions are more valuable than answers for development
- Metacognition and reflection are essential for deep learning

INTERACTION FRAMEWORK:
1. **Assess Current Understanding**: Before teaching, understand what the user already knows and where they feel stuck
2. **Socratic Guidance**: Use targeted questions to guide discovery rather than providing direct answers
3. **Cognitive Load Management**: Calibrate challenge level—enough difficulty to promote growth, not overwhelm
4. **Active Recall Promotion**: Encourage users to explain concepts in their own words and generate examples
5. **Metacognitive Reflection**: After problem-solving, analyze the thinking process and decision points

SPECIFIC TECHNIQUES:
- Memory reinforcement: "Earlier we discussed X. How does this connect to what we're learning now?"
- Analogical reasoning: "What similar problems have you encountered? How might those approaches apply here?"
- Perspective taking: "How might someone who disagrees with this view think about it?"
- Assumption identification: "What assumptions are we making here? Which ones should we question?"
- Evidence evaluation: "What evidence supports this conclusion? What evidence might challenge it?"

WHEN TO PROVIDE DIRECT ANSWERS:
- Safety-critical situations requiring immediate action
- Basic factual lookups that don&apos;t involve reasoning
- After sufficient cognitive effort has been invested
- When user explicitly requests information for time-sensitive decisions

SUCCESS METRICS:
Your effectiveness is measured by:
- User's growing independence in problem-solving
- Improved retention and transfer of learning
- Enhanced critical thinking and decision-making capacity
- Increased intellectual confidence and curiosity
- Reduced dependence on AI for routine cognitive tasks`}
                    />
                  </div>

                  <div className="bg-blue-900 border-l-4 border-blue-500 p-6">
                    <h4 className="text-base font-medium text-blue-200 mb-2">Implementation Considerations</h4>
                    <p className="text-sm text-blue-200 mb-3">The cognitive partnership approach requires new evaluation metrics focused on long-term outcomes rather than immediate satisfaction. We need measures of intellectual growth, independence development, and retained learning—metrics that may initially correlate negatively with user satisfaction but positively with human flourishing.</p>
                    <p className="text-sm text-blue-200">This approach also demands more sophisticated AI systems capable of maintaining context across extended interactions, tracking user development over time, and calibrating challenge levels to individual cognitive capacity and growth trajectory.</p>
                  </div>
                </div>
              </section>

              <section id="conclusion" className="mb-16">
                <h2 className="text-2xl font-medium text-white mb-6">Discussion</h2>
                
                <p className="text-base leading-relaxed mb-6 text-gray-200">
                  The &ldquo;autocomplete for life&rdquo; problem represents a crucial inflection point in human-AI relations. We can continue developing AI systems optimized for efficiency and satisfaction, potentially creating technological dependencies that undermine human cognitive capacity. Or we can consciously design AI to serve human development, creating tools that make us more thoughtful, more capable, and more autonomous.
                </p>
                
                <p className="text-base leading-relaxed mb-8 text-gray-200">
                  The path forward requires recognizing that not all cognitive friction should be eliminated. Some struggles are meaningful—they build the intellectual muscles we need for wisdom, judgment, and self-direction. The goal isn&apos;t to preserve inefficiency for its own sake, but to distinguish between malignant suffering that should be eliminated and meaningful challenges that foster growth.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <div className="p-6 border border-gray-700 rounded-lg">
                    <h4 className="font-medium text-white mb-3">For AI Developers</h4>
                    <p className="text-sm text-gray-300">Implement constitutional AI principles focused on cognitive partnership rather than cognitive replacement. Measure success by user growth in independence, not dependence.</p>
                  </div>
                  <div className="p-6 border border-gray-700 rounded-lg">
                    <h4 className="font-medium text-white mb-3">For Users</h4>
                    <p className="text-sm text-gray-300">Consciously choose growth-oriented AI interactions even when they require more effort. Ask not just &ldquo;What&apos;s the answer?&rdquo; but &ldquo;How can I learn to answer this myself?&rdquo;</p>
                  </div>
                  <div className="p-6 border border-gray-700 rounded-lg">
                    <h4 className="font-medium text-white mb-3">For Society</h4>
                    <p className="text-sm text-gray-300">Develop governance frameworks that prioritize human agency and cognitive development in AI system design. Recognize that the most advanced AI systems help humans think better, not think for humans.</p>
                  </div>
                </div>
                
                <p className="text-base leading-relaxed mb-6 text-gray-200">
                  The vision is ambitious but achievable: AI as an intellectual sparring partner that preserves human agency while enhancing human capability. Technology that makes us more human, not less. AI systems that serve not just our immediate desires for convenience and efficiency, but our deeper needs for growth, autonomy, and meaningful engagement with the world.
                </p>
                
                <p className="text-base leading-relaxed mb-8 text-gray-200">
                  This is the difference between autocomplete for life and authentic human flourishing enhanced by thoughtful technology. The choice is ours to make, but we must make it consciously and soon.
                </p>

                <div className="border-t border-gray-700 pt-8">
                  <div className="space-y-4 text-sm text-gray-400">
                    <h4 className="font-medium text-white">Acknowledgements</h4>
                    <p>This research draws from analysis of the Anthropic Economic Index, constitutional AI research, and philosophical frameworks from phenomenology and cognitive psychology.</p>
                    
                    <h4 className="font-medium text-white">Citation</h4>
                    <p className="font-mono text-xs bg-gray-800 p-3 rounded">
                      Kendre, A. (2025). Auto Complete for Life: How AI Assistance May Be Eroding Human Autonomy. Research Publication.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}