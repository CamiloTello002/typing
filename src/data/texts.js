export const TEXTS = [
  "The only way to learn a new programming language is by writing programs in it. Start small, build something real, and debug your way through the confusion. Every error message is a lesson in disguise.",
  "In the beginning was the command line. Before the era of graphical interfaces, all interaction happened through typed text. Those who mastered the terminal held a kind of power that felt almost magical.",
  "Simplicity is the soul of efficiency. When you strip away the unnecessary, what remains is clarity. Good code reads like a well-written sentence: every word earns its place and nothing is wasted.",
  "A ship in harbor is safe, but that is not what ships are for. Taking risks is not recklessness; it is the price of discovery. Growth lives just beyond the edge of your comfort zone.",
  "The universe is under no obligation to make sense to you. Yet here we are, building models and writing equations, slowly peeling back the layers of a reality far stranger than any fiction.",
  "Every great developer you know got there by solving problems they were unqualified to solve, until one day they looked around and realized they were no longer unqualified. Experience is just failure in retrospect.",
  "Premature optimization is the root of all evil. Write code that works first, then measure it, and only then speed up the parts that actually matter. A fast program that is wrong is still wrong.",
  "We are all apprentices in a craft where no one ever becomes a master. The moment you believe you know everything is the moment you stop learning. Curiosity is the only sustainable fuel for a long career.",
  "The best error message is the one that never shows up. Design systems that make the wrong thing hard and the right thing obvious. Defensive programming is not paranoia; it is professionalism.",
  "To iterate is human, to recurse divine. Loops and recursion are two ways of saying the same thing, but each carries a different philosophy about how problems should be broken apart and put back together.",
  "Reading is to the mind what exercise is to the body. Every book you finish, every paper you study, every post you dissect adds another layer to your thinking. The best programmers are voracious readers.",
  "There are only two hard things in computer science: cache invalidation and naming things. A good name is a contract between author and reader. It promises meaning and asks nothing in return but attention.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it. Keep it simple.",
  "The internet is the world's largest library. It just happens to have all the books on the floor. Learning to search effectively is itself a skill, and one that compounds faster than almost any other.",
  "Software is eating the world, but it is also being eaten by complexity. The systems we build outlive our understanding of them. Good documentation is an act of kindness toward your future self.",
]

export function getRandomText(excludeIndex = null) {
  let index
  do {
    index = Math.floor(Math.random() * TEXTS.length)
  } while (TEXTS.length > 1 && index === excludeIndex)
  return { text: TEXTS[index], index }
}
