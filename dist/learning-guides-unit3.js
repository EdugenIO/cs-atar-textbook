const unit3LearningGuides = {
  "unit3-fluency": {
    "anchor": "Separate validation, processing and display",
    "title": "From text to a result",
    "lead": "Follow valid input through three different jobs.",
    "kind": "flow",
    "nodes": [
      {
        "label": "Validate",
        "detail": "Convert integer text and check the non-negative range. \"0\" is valid; \"5.0\" is rejected."
      },
      {
        "label": "Process",
        "detail": "Count observations at least the checked minimum. Equality and repeated observations count."
      },
      {
        "label": "Display",
        "detail": "Show the returned count in the mainline. Keep printing outside the counting function."
      }
    ],
    "caption": "None signals rejected input; zero is a valid result or value, depending on the function.",
    "predict": "The parser returns 0. Should the counting step be skipped as invalid input?",
    "answer": "No. Test value is None to detect rejection. Testing not value would also reject valid zero.",
    "retry": "Change the input to \"-1\". Explain which stage rejects it and why processing must not use it."
  },
  "unit3-structures": {
    "anchor": "Parameters: mutation and rebinding",
    "title": "Change the object or change the name?",
    "lead": "Start with a caller list [1]. A parameter called values refers to that same list.",
    "kind": "trace",
    "columns": [
      "Step inside the function",
      "Parameter refers to",
      "Caller list"
    ],
    "rows": [
      [
        "On entry",
        "The original list",
        "[1]"
      ],
      [
        "values.append(7)",
        "The original list, now changed",
        "[1, 7]"
      ],
      [
        "values = [100]",
        "A different list",
        "[1, 7]"
      ]
    ],
    "caption": "Appending mutates the shared object. Assignment rebinds the local name. Python uses one argument-passing mechanism, not separate mechanisms for lists and integers.",
    "predict": "After the final step, does the caller list become [100]?",
    "answer": "No. Rebinding values only changes the local name. The caller still refers to the original list [1, 7].",
    "retry": "Replace append with values = values + [7]. Explain why the caller would now keep [1]."
  },
  "unit3-search": {
    "anchor": "Desk-check the bounds",
    "title": "Three probes find 117",
    "lead": "Use ascending IDs [101, 104, 108, 112, 117, 123, 130]. Record the bounds before each probe.",
    "kind": "trace",
    "columns": [
      "Probe",
      "low–high",
      "mid / value",
      "Next action"
    ],
    "rows": [
      [
        "1",
        "0–6",
        "3 / 112",
        "Target is larger: low = 4"
      ],
      [
        "2",
        "4–6",
        "5 / 123",
        "Target is smaller: high = 4"
      ],
      [
        "3",
        "4–4",
        "4 / 117",
        "Match: return index 4"
      ]
    ],
    "caption": "A one-item interval still needs checking. This implementation returns any matching index; it requires ascending input.",
    "predict": "If the target changes to 119, what happens after the third probe?",
    "answer": "Index 4 contains 117, which is smaller than 119. Set low to 5. Now low exceeds high (4), so return None.",
    "retry": "Use target 101. Trace the new bounds and explain why a successful index 0 must not be mistaken for failure."
  },
  "unit3-sort": {
    "anchor": "Bubble sort: move the largest to the end",
    "title": "One bubble pass",
    "lead": "Start with [5, 2, 4, 1]. Each row shows the list after a neighbouring-pair comparison.",
    "kind": "trace",
    "columns": [
      "Compare",
      "Action",
      "List afterwards"
    ],
    "rows": [
      [
        "5 and 2",
        "Swap",
        "[2, 5, 4, 1]"
      ],
      [
        "5 and 4",
        "Swap",
        "[2, 4, 5, 1]"
      ],
      [
        "5 and 1",
        "Swap",
        "[2, 4, 1, 5]"
      ]
    ],
    "caption": "The first pass fixes the largest value at the right. The remaining prefix still needs sorting. The worked routine returns a comparison count and changes the list in place.",
    "predict": "Is the whole list sorted after these three comparisons?",
    "answer": "No. The 5 is in its final position, but [2, 4, 1] is not sorted. The next pass excludes the fixed 5.",
    "retry": "Predict the second complete pass. Explain why [2, 1, 4, 5] still needs another pass."
  },
  "unit3-objects": {
    "anchor": "Encapsulation and abstraction",
    "title": "Protect the stock rule",
    "lead": "A camera starts with total stock 2 and no units on loan. The public methods check changes.",
    "kind": "trace",
    "columns": [
      "Operation",
      "Result",
      "On loan",
      "Available"
    ],
    "rows": [
      [
        "Create camera",
        "Starting state",
        "0",
        "2"
      ],
      [
        "lend(1)",
        "True",
        "1",
        "1"
      ],
      [
        "lend(2)",
        "False: insufficient stock",
        "1",
        "1"
      ],
      [
        "return_units(1)",
        "True",
        "0",
        "2"
      ]
    ],
    "caption": "The invariant is 0 ≤ on_loan ≤ total. A leading underscore is a convention, not enforced privacy or user access control.",
    "predict": "Why does the failed lend(2) leave availability at 1?",
    "answer": "There is only one available unit. The method rejects the request before changing stock, preserving the invariant.",
    "retry": "Try returning one more unit after the final row. Predict the result and explain which state must remain unchanged."
  },
  "unit3-inheritance": {
    "anchor": "Polymorphism: one call, different implementations",
    "title": "One call, three receivers",
    "lead": "The report calls item.preparation() without checking each subclass itself.",
    "kind": "cards",
    "nodes": [
      {
        "label": "Camera",
        "detail": "Uses Camera.preparation() and returns the camera-specific message."
      },
      {
        "label": "Projector",
        "detail": "Uses Projector.preparation() and returns the projector-specific message."
      },
      {
        "label": "Equipment",
        "detail": "Uses Equipment.preparation() and returns the general message."
      }
    ],
    "caption": "These cards compare receivers; they are not sequential steps. Each method must preserve the shared caller-facing interface. Python can also use compatible objects without shared inheritance.",
    "predict": "An AudioRecorder supplies compatible get_id() and preparation() methods. Must the reporting loop gain a new type-check branch?",
    "answer": "No. The loop can keep calling the common methods. Each receiver supplies its own implementation; that is the polymorphic behaviour.",
    "retry": "Explain what would break if AudioRecorder.preparation() required an extra argument from the caller."
  },
  "unit3-project": {
    "anchor": "Choose and justify the algorithms",
    "title": "A report is a separate view",
    "lead": "Keep retained loan history in issue order while producing an ID-ordered outstanding report.",
    "kind": "flow",
    "nodes": [
      {
        "label": "Scan history",
        "detail": "Read h retained loan records and select the active ones."
      },
      {
        "label": "Create snapshots",
        "detail": "Build m report rows from the current values. Leave live history unchanged."
      },
      {
        "label": "Sort the report",
        "detail": "Insertion-sort the new rows by loan ID. Do not sort retained history directly."
      },
      {
        "label": "Show the result",
        "detail": "Display the ordered active-loan view; later changes require a fresh report."
      }
    ],
    "caption": "Filtering plus sorting takes O(h + m²) worst-case time and O(m) report space. IDs use string order; fixed-width examples L002 and L010 have the intended order.",
    "predict": "If history contains L002 then L001 and both are active, which order should the report show?",
    "answer": "The report shows L001 then L002. Retained history stays L002 then L001 because it records issue order.",
    "retry": "Mark L002 returned. Explain which row appears in a newly generated active report and what remains in history."
  },
  "unit3-reliability": {
    "anchor": "Isolate a fault before changing code",
    "title": "Repair the cause, then retest",
    "lead": "Use the repeated-return fault to practise a small, explainable debugging cycle.",
    "kind": "flow",
    "nodes": [
      {
        "label": "Reproduce",
        "detail": "Return the same loan twice. Expected availability stays at total stock 3 after the second request."
      },
      {
        "label": "Inspect",
        "detail": "Check the active flag before the stock update. The faulty routine restores stock even for a closed loan."
      },
      {
        "label": "Repair",
        "detail": "Reject an inactive loan before adding quantity. Keep the original expected results."
      },
      {
        "label": "Retest",
        "detail": "Check the repeated return, then rerun relevant established loan and report tests."
      }
    ],
    "caption": "The faulty lab can show True / 4 on a second return; the required result is False / 3. Passing tests sample behaviour rather than proving all faults absent.",
    "predict": "Would changing the expected second availability to 4 repair the defect?",
    "answer": "No. It would accept behaviour that violates the stock requirement. Keep the expectation at 3 and fix the update guard.",
    "retry": "Explain why you should also retest a normal first return after repairing the repeated-return path."
  },
  "unit3-network-models": {
    "anchor": "Distinguish layer 2 switching from layer 3 routing",
    "title": "Same remote IP, new local frame",
    "lead": "Follow a client packet through one router. MAC labels C, RA, RB and S identify interfaces.",
    "kind": "trace",
    "columns": [
      "Observation",
      "IP destination",
      "Frame destination",
      "IPv4 TTL"
    ],
    "rows": [
      [
        "Client sends on LAN A",
        "198.51.100.20",
        "RA: gateway interface",
        "64"
      ],
      [
        "After switch A",
        "198.51.100.20",
        "RA: gateway interface",
        "64"
      ],
      [
        "Router sends on LAN B",
        "198.51.100.20",
        "S: server interface",
        "63"
      ],
      [
        "After switch B",
        "198.51.100.20",
        "S: server interface",
        "63"
      ]
    ],
    "caption": "Conceptual trace, not an official Cisco diagram or live capture. This ordinary-forwarding example excludes NAT, tunnelling, fragmentation and VLAN tags. Frame source also changes C→RB across the router; endpoint IPs and ports remain unchanged.",
    "predict": "Should switch A replace the remote destination IP with the gateway IP?",
    "answer": "No. Ordinary layer 2 switching preserves the IP packet and MAC addresses. The router is the next local frame destination, not the endpoint IP destination.",
    "retry": "Explain why the router must also update the IPv4 header checksum when TTL changes."
  },
  "unit3-addressing": {
    "anchor": "Work a host address into its subnet",
    "title": "Place .70 inside a /27 block",
    "lead": "Use 192.168.50.70/27. Its mask is 255.255.255.224.",
    "kind": "flow",
    "nodes": [
      {
        "label": "Find block size",
        "detail": "256 − 224 = 32 addresses in the final-octet block."
      },
      {
        "label": "Locate the block",
        "detail": "Boundaries are 0, 32, 64, 96, …; 70 is inside 64–95."
      },
      {
        "label": "Reserve endpoints",
        "detail": "Network is .64 and directed broadcast is .95."
      },
      {
        "label": "Count ordinary hosts",
        "detail": "Use .65–.94: 30 ordinary usable addresses, including any gateway."
      }
    ],
    "caption": "This is the ordinary IPv4 LAN model. A chosen gateway must actually be a reachable router interface. The final-octet shortcut does not apply unchanged to every prefix.",
    "predict": "Can .95 be a host’s gateway in this ordinary /27 plan?",
    "answer": "No. .95 is the directed broadcast address, not an ordinary usable host address. A candidate such as .65 fits mathematically but still needs actual router configuration.",
    "retry": "Move the host to 192.168.50.100/27. Work out the new block and ordinary host range."
  },
  "unit3-secure-networks": {
    "anchor": "Use ping and traceroute as evidence",
    "title": "A missing reply is a limited observation",
    "lead": "Read the synthetic three-hop result before choosing a conclusion.",
    "kind": "trace",
    "columns": [
      "Hop",
      "Observed response",
      "What it supports"
    ],
    "rows": [
      [
        "1",
        "Reply",
        "That probe received a reply from hop 1."
      ],
      [
        "2",
        "No reply: asterisks",
        "No reply arrived for those probes; the cause is not yet established."
      ],
      [
        "3: destination",
        "Reply",
        "Traffic reached the destination despite the unanswered middle probes."
      ]
    ],
    "caption": "Conceptual evidence table, not an official topology diagram. Traceroute can reveal routed hops, not ordinary layer 2 switches. RTTs are source-to-hop round trips, not separate link delays.",
    "predict": "Does the unanswered second hop prove that ordinary traffic stops there?",
    "answer": "No. The destination reply shows forwarding continued. Filtering, reply loss or response prioritisation can affect probe replies.",
    "retry": "If ping succeeds but the web service fails, name one service or transport check that would help distinguish the cause."
  },
  "unit3-review": {
    "anchor": "Interpret evidence and diagnose layers",
    "title": "Match a next check to the symptom",
    "lead": "A successful probe answers one question. Choose the next check from what still fails.",
    "kind": "cards",
    "nodes": [
      {
        "label": "IP works; name fails",
        "detail": "Check DNS records and client name-resolution settings. An IP reply does not prove application health."
      },
      {
        "label": "Ping works; web fails",
        "detail": "Check the listening web service, transport policy and application/TLS conditions."
      },
      {
        "label": "Middle hop silent; destination replies",
        "detail": "Record missing probe replies. Do not label the route broken at that hop."
      },
      {
        "label": "Guest ping times out",
        "detail": "Compare required allowed and denied services. One timeout does not prove full isolation."
      }
    ],
    "caption": "These are possible next checks, not established causes. Use assigned authorised targets; synthetic logs do not replace live-tool practice.",
    "predict": "Which card fits a server that replies by IP but whose hostname cannot be resolved?",
    "answer": "The first card. DNS records or client configuration are sensible next checks; the observation alone does not identify exactly which is wrong.",
    "retry": "For the guest timeout, explain why testing an allowed service as well as a denied one gives more useful policy evidence."
  },
  "unit3-consolidation": {
    "anchor": "Make algorithm and object reasoning explicit",
    "title": "Quantity order is not ID order",
    "lead": "Stable insertion sort by quantity turns X03:4, X01:2, X02:4 into these positions.",
    "kind": "array",
    "nodes": [
      {
        "label": "Index 0: X01",
        "detail": "Quantity 2"
      },
      {
        "label": "Index 1: X03",
        "detail": "Quantity 4; originally before X02"
      },
      {
        "label": "Index 2: X02",
        "detail": "Quantity 4; stays after X03"
      }
    ],
    "caption": "The array is ascending by quantity, not by ID. Stable sorting keeps equal-key order. ID binary search needs a separate correctly ordered view or another suitable lookup method.",
    "predict": "Can you binary-search this array directly for ID X02 using ascending ID comparisons?",
    "answer": "No. The ID order X01, X03, X02 is not ascending. The quantity order does not meet the ID-search precondition.",
    "retry": "Build an ascending-ID view. Explain how it can coexist with this quantity-ordered display without changing the original purpose of either view."
  },
  "unit3-exam": {
    "anchor": "Read the task and plan the evidence",
    "title": "Turn a command word into evidence",
    "lead": "Use the requested command to choose how you will show your reasoning.",
    "kind": "cards",
    "nodes": [
      {
        "label": "Trace",
        "detail": "Show changing variables, indexes or object state in order, then the final result."
      },
      {
        "label": "Explain",
        "detail": "Give the mechanism or reason, such as why a bound must include equality."
      },
      {
        "label": "Justify",
        "detail": "Connect a choice to stated needs, assumptions and costs."
      },
      {
        "label": "Evaluate",
        "detail": "Weigh evidence, alternatives and limitations before a supported judgement."
      }
    ],
    "caption": "These are guidance examples, not an official marking key. Read the whole question and required representation. Actual examination reading-period rules come from the supervisor and current instructions.",
    "predict": "A question asks you to justify binary search. Is “it is fast” enough?",
    "answer": "No. Connect the choice to suitable ascending input and repeated lookups, discuss preparation or update costs where relevant, and explain the growth advantage under those assumptions.",
    "retry": "Change the data to a small unsorted list needed for one lookup. Explain how your justification could change."
  }
};
