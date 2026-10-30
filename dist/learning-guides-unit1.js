const unit1LearningGuides = {
  "start": {
    "anchor": "Sequence: follow the order",
    "title": "Follow one order through the program",
    "lead": "Keep the input, calculation and output separate. Follow the same value through all three steps.",
    "kind": "flow",
    "nodes": [
      {
        "label": "Input",
        "detail": "4 badges"
      },
      {
        "label": "Process",
        "detail": "4 × $3 = $12"
      },
      {
        "label": "Output",
        "detail": "Total: $12"
      }
    ],
    "caption": "An algorithm puts these actions in order. The program does not display the answer until it has calculated it.",
    "predict": "If you enter 6 badges instead of 4, which parts of the walkthrough change?",
    "answer": "The input becomes 6, the calculation becomes 6 × $3, and the output becomes Total: $18. The price per badge stays $3.",
    "retry": "Cover the walkthrough and describe the three steps for 0 badges. Then check that the total is $0."
  },
  "values": {
    "anchor": "Convert deliberately",
    "title": "Same digits, different operations",
    "lead": "Quotation marks tell you that a value is text. Decide whether you want to join text or add numbers.",
    "kind": "cards",
    "nodes": [
      {
        "label": "Text",
        "detail": "\"12\" + \"3\" → \"123\""
      },
      {
        "label": "Integers",
        "detail": "12 + 3 → 15"
      },
      {
        "label": "Convert first",
        "detail": "int(\"12\") + int(\"3\") → 15"
      }
    ],
    "caption": "The data type affects what + does. Input from input() starts as text.",
    "predict": "A program reads \"4\" and \"5\" with input(). What does adding those two strings produce?",
    "answer": "It produces the string \"45\". Convert valid numeric text to integers before adding if you want the numeric result 9.",
    "retry": "Explain why a postcode such as \"0042\" should usually stay as text even though it contains digits."
  },
  "representation": {
    "anchor": "Place value changes with the base",
    "title": "Read the positions containing 1",
    "lead": "Each binary position has a value. A 1 includes that value; a 0 leaves it out.",
    "kind": "array",
    "nodes": [
      {
        "label": "16",
        "detail": "1 → include 16"
      },
      {
        "label": "8",
        "detail": "0 → leave out 8"
      },
      {
        "label": "4",
        "detail": "1 → include 4"
      },
      {
        "label": "2",
        "detail": "1 → include 2"
      },
      {
        "label": "1",
        "detail": "0 → leave out 1"
      }
    ],
    "caption": "Binary 10110 = 16 + 4 + 2 = decimal 22. These labels are place values, not list indices.",
    "predict": "Change only the rightmost digit from 0 to 1. What decimal value does 10111 represent?",
    "answer": "23. The rightmost position adds 1 to the previous value of 22.",
    "retry": "Cover the caption. Convert 11001 by adding only the positions containing 1, then check that you get 25."
  },
  "selection": {
    "anchor": "Combine conditions and choices",
    "title": "Check the boundary from both sides",
    "lead": "Compare each order with $50. The words “at least” mean that exactly $50 is included.",
    "kind": "trace",
    "columns": [
      "Order total",
      "total >= 50",
      "Chosen charge"
    ],
    "rows": [
      [
        "$49.99",
        "False",
        "$5"
      ],
      [
        "$50.00",
        "True",
        "$0"
      ],
      [
        "$50.01",
        "True",
        "$0"
      ]
    ],
    "caption": "The comparison changes at $50. Exactly one branch chooses the charge for each order.",
    "predict": "If you replace >= with >, which row gives a different result?",
    "answer": "The $50.00 row changes to False and wrongly gets a $5 charge. The rows below and above the boundary keep their previous results.",
    "retry": "Try a new free-delivery threshold of $80. Choose a value just below, exactly at and just above it, and predict each charge."
  },
  "loops": {
    "anchor": "Trace the running total",
    "title": "Watch the total grow",
    "lead": "The total starts once, before the loop. Each donation adds to the previous total.",
    "kind": "trace",
    "columns": [
      "Pass",
      "Donation",
      "Total before",
      "Total after"
    ],
    "rows": [
      [
        "1",
        "$5",
        "$0",
        "$5"
      ],
      [
        "2",
        "$7",
        "$5",
        "$12"
      ],
      [
        "3",
        "$3",
        "$12",
        "$15"
      ]
    ],
    "caption": "The total after one pass becomes the total before the next pass. This is accumulation.",
    "predict": "If total = 0 were inside the loop just before adding each donation, what final total would you get?",
    "answer": "$3, only the last donation. Resetting the total each time erases the earlier amounts.",
    "retry": "Trace donations of $2, $0 and $4 without running code. Explain why the zero donation still counts as a pass."
  },
  "functions": {
    "anchor": "One task, one function",
    "title": "Follow arguments into a function",
    "lead": "A function receives values, does its job and returns a result. The parameter names describe the jobs of the values.",
    "kind": "flow",
    "nodes": [
      {
        "label": "Call",
        "detail": "badge_cost(4, 3)"
      },
      {
        "label": "Inside the function",
        "detail": "quantity = 4; unit_price = 3"
      },
      {
        "label": "Calculate and return",
        "detail": "return 4 × 3 → 12"
      },
      {
        "label": "Caller",
        "detail": "Can save, display or reuse 12"
      }
    ],
    "caption": "4 and 3 are arguments. quantity and unit_price are parameters. Returning a value is different from printing it.",
    "predict": "What should badge_cost(0, 3) return? Does the calculation function need to ask you for input?",
    "answer": "It should return 0. It already receives its inputs as arguments, so it does not need an input prompt.",
    "retry": "Explain the difference between print(12) and return 12 to a partner, including where the value goes."
  },
  "arrays": {
    "anchor": "Remember the location of the best value",
    "title": "Which index do you remember?",
    "lead": "The list is [4, 9, 9]. best_index remembers a position, not the largest number itself. Follow an algorithm that uses >.",
    "kind": "trace",
    "columns": [
      "Action",
      "Comparison",
      "best_index",
      "Value at best_index"
    ],
    "rows": [
      [
        "Start at index 0",
        "No comparison yet",
        "0",
        "4"
      ],
      [
        "Check index 1",
        "9 > 4 is True",
        "1",
        "9"
      ],
      [
        "Check index 2",
        "9 > 9 is False",
        "1",
        "9"
      ]
    ],
    "caption": "The first 9 stays selected. With >=, the last row would update best_index to 2. Both choices find the value 9.",
    "predict": "For [-8, -3], what are best_index and the remembered value at the start? What are they at the end?",
    "answer": "At the start, best_index is 0 and the value there is -8. At the end, best_index is 1 and the largest value is -3. Index zero does not mean the value zero.",
    "retry": "Try [7, 7, 2]. Predict the returned index using >, then using >=. Explain why the answers are 0 and 1."
  },
  "files": {
    "anchor": "Accept only usable input",
    "title": "Two different input checks",
    "lead": "First ask whether the text can become an integer. Then ask whether that integer is allowed.",
    "kind": "trace",
    "columns": [
      "Text entered",
      "int conversion",
      "Range check: quantity >= 0",
      "Decision"
    ],
    "rows": [
      [
        "\"three\"",
        "Fails",
        "Not reached",
        "Ask again"
      ],
      [
        "\"-3\"",
        "Gives -3",
        "False",
        "Ask again"
      ],
      [
        "\"0\"",
        "Gives 0",
        "True",
        "Accept"
      ]
    ],
    "caption": "Successful conversion does not guarantee an allowed value. Passing both checks does not prove the user entered the truth.",
    "predict": "Which check rejects the text \"2.5\" in this integer-quantity example?",
    "answer": "int(\"2.5\") raises ValueError, so conversion fails. The range check is not reached for that attempt.",
    "retry": "Explain why append mode a and write mode w behave differently on a second run of the same file-saving program."
  },
  "design": {
    "anchor": "Test: choose evidence that can expose mistakes",
    "title": "Trace the required game state",
    "lead": "Predict the outcome before running a controlled test.",
    "kind": "trace",
    "columns": [
      "Initial state / action",
      "Expected state",
      "Evidence"
    ],
    "rows": [
      [
        "Active item; collect",
        "Score +10; item inactive",
        "Collection function result"
      ],
      [
        "Same inactive item; collect again",
        "Score unchanged",
        "Repeat-call regression"
      ],
      [
        "Restart after a result",
        "Initial score, lives, time and objects",
        "Full-state acceptance check"
      ]
    ],
    "caption": "The shared game contract defines observable state; a screenshot alone cannot establish all transitions.",
    "predict": "What should happen on the second collection, and which state must restart restore?",
    "answer": "The second collection adds no points. Restart restores the common initial game state, including objects and active-play time, not only the displayed score.",
    "retry": "Pause long enough to cross 90 wall-clock seconds. Explain which values must remain unchanged and how you would record evidence."
  },
  "software-responsibility": {
    "anchor": "Read the licence before reuse",
    "title": "Check two separate responsibilities",
    "lead": "Giving credit and having permission answer different questions. Check both before reusing code.",
    "kind": "cards",
    "nodes": [
      {
        "label": "Attribution",
        "detail": "Who made it, and have you represented their work honestly?"
      },
      {
        "label": "Permission",
        "detail": "Does the licence or another permission allow your intended use?"
      },
      {
        "label": "Conditions",
        "detail": "Which notices or other requirements must you follow?"
      }
    ],
    "caption": "Free to download and visible source code do not, by themselves, establish permission to modify or redistribute.",
    "predict": "A tutorial is credited in your source log, but its licence does not allow redistribution. Does the credit solve that restriction?",
    "answer": "No. Credit addresses attribution; it does not override the licence. You need permission for the intended use and must follow its conditions.",
    "retry": "Explain why an open-source licence can still have obligations. Name one example, such as keeping required copyright notices."
  },
  "networks": {
    "anchor": "Four layers, four responsibilities",
    "title": "Four questions for one message",
    "lead": "For a web request using TCP, follow the sender’s layers from application data towards the local link.",
    "kind": "flow",
    "nodes": [
      {
        "label": "Application",
        "detail": "What service? HTTP web request"
      },
      {
        "label": "Transport",
        "detail": "How is application data carried? TCP byte stream"
      },
      {
        "label": "Internet",
        "detail": "Which IP destination and route? IP packet"
      },
      {
        "label": "Network access",
        "detail": "How does it cross this local link? Ethernet or Wi-Fi frame"
      }
    ],
    "caption": "Conceptual DoD layer walkthrough, not a Cisco network diagram. The receiver processes information back up the stack.",
    "predict": "Which layer supports routing to an IP destination outside the local network?",
    "answer": "The Internet layer. The network-access layer handles the next local link, not the whole route to the remote service.",
    "retry": "Cover the layer names. Explain the four jobs in your own words, then match each explanation to a layer."
  },
  "addressing": {
    "anchor": "Addresses and the local network",
    "title": "Apply the same mask before comparing",
    "lead": "The host is 192.168.10.24/24. With /24, the mask is 255.255.255.0.",
    "kind": "trace",
    "columns": [
      "Address",
      "Network under /24",
      "Compared with the host"
    ],
    "rows": [
      [
        "192.168.10.24",
        "192.168.10.0",
        "The host itself"
      ],
      [
        "192.168.10.80",
        "192.168.10.0",
        "Same local network"
      ],
      [
        "192.168.11.80",
        "192.168.11.0",
        "Different network: routing needed"
      ]
    ],
    "caption": "This first-three-octet shortcut works for /24. Other masks require comparing the actual network-prefix bits.",
    "predict": "Is 192.168.10.200 local to this host under the same /24 mask? Explain using the network address.",
    "answer": "Yes. Both have network address 192.168.10.0 under /24. Do not decide only by looking at how similar the full addresses appear.",
    "retry": "Change the destination to 192.168.12.200/24. Name its network and explain why a router is needed."
  },
  "network-design": {
    "anchor": "Find the bottleneck",
    "title": "Separate three performance ideas",
    "lead": "“The network is slow” is a starting observation. These terms describe different things to investigate.",
    "kind": "cards",
    "nodes": [
      {
        "label": "Bandwidth",
        "detail": "Capacity: how much the link could carry per second"
      },
      {
        "label": "Throughput",
        "detail": "The transfer rate you actually achieve"
      },
      {
        "label": "Latency",
        "detail": "Delay before data or a response arrives"
      }
    ],
    "caption": "A busy server, congested link or shared wireless airtime can limit a transfer. A higher advertised link speed does not fix every cause.",
    "predict": "A remote service is overloaded. Will replacing a local switch necessarily speed up the download?",
    "answer": "No. The limiting resource may be the remote service, so changing the local switch may not affect it. Use evidence to identify the bottleneck first.",
    "retry": "Choose a different cause, such as weak Wi-Fi signal. Name one observation you would collect and a change that could address it."
  },
  "network-review": {
    "anchor": "Use a repeatable explanation",
    "title": "Build an explanation that answers why",
    "lead": "For the library scenario, connect the user’s need to a control and its effect.",
    "kind": "flow",
    "nodes": [
      {
        "label": "Need",
        "detail": "Students can read resources but must not alter staff files"
      },
      {
        "label": "Control",
        "detail": "Separate accounts and suitable file permissions"
      },
      {
        "label": "Action",
        "detail": "Allow the needed reads; deny unauthorised writes"
      },
      {
        "label": "Outcome and limit",
        "detail": "Reduces unauthorised changes; configuration still needs testing"
      }
    ],
    "caption": "Naming a control is only the start. Explain its action in this scenario and what it cannot prove.",
    "predict": "Does a successful ping prove that the library website can be opened?",
    "answer": "No. Ping checks for an ICMP reply. DNS, HTTPS, web-service configuration or access rules can still prevent the website from opening.",
    "retry": "Choose a firewall rule from your own practice design. Explain its need, action, expected outcome and one limitation."
  },
  "consolidation": {
    "anchor": "Station C: debug and prove the correction",
    "title": "Find the first wrong value",
    "lead": "A faulty maximum search starts its largest value at 0 and checks [-8, -3]. Neither item is larger than 0.",
    "kind": "trace",
    "columns": [
      "Step",
      "Faulty remembered value",
      "Start-from-first-value version"
    ],
    "rows": [
      [
        "Start",
        "0, which is not in the list",
        "-8 at index 0"
      ],
      [
        "Check -3",
        "Still 0: -3 > 0 is False",
        "-3 at index 1: -3 > -8 is True"
      ]
    ],
    "caption": "Use a real list element as the starting maximum, after checking for an empty list.",
    "predict": "Why might testing only [4, 9, 9] fail to expose this zero-start bug?",
    "answer": "A positive value replaces zero, so that test can still find the correct maximum. All-negative data exposes the incorrect starting value.",
    "retry": "Explain which extra cases check different risks: an empty list, a one-element list and repeated largest values."
  },
  "exam-preparation": {
    "anchor": "Turn feedback into a plan",
    "title": "Use a mistake to choose the next practice",
    "lead": "The useful result of practice is knowing what to work on next. Keep the correction small and specific.",
    "kind": "flow",
    "nodes": [
      {
        "label": "Attempt",
        "detail": "Answer without opening the explanation"
      },
      {
        "label": "Diagnose",
        "detail": "Was the problem knowledge, tracing, interpretation or reasoning?"
      },
      {
        "label": "Correct",
        "detail": "Explain the exact change in your own words"
      },
      {
        "label": "Try changed data",
        "detail": "Use a new example to check the idea again"
      }
    ],
    "caption": "Recognising an answer is different from being able to produce and explain it. These are optional learning activities, not grade predictions.",
    "predict": "You copied a correct answer but cannot explain why it works. What should you do before moving on?",
    "answer": "Revisit the idea, explain the reasoning without copying, then try a changed example and check it. Copying alone does not show understanding.",
    "retry": "Return to one topic after a break. Cover your notes, write the main idea and an example from memory, then check and correct them."
  }
};
