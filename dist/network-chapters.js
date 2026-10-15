chapters.push(...[
  {
    "id": "networks",
    "week": 11,
    "title": "Network foundations",
    "intro": "When you open a website, several network jobs happen together. Follow the message and learn which layer handles each job.",
    "badge": "NETWORKS",
    "objectives": [
      "Explain why communication protocols are needed.",
      "Describe the four layers of the DoD TCP/IP model.",
      "Match common protocols to their purpose."
    ],
    "sections": [
      [
        "A shared set of rules",
        "<p>When you open a web page, your device exchanges data with other devices. A <strong>network</strong> connects them so they can communicate and share resources. They need shared rules about message formats and responses. These rules are <strong>protocols</strong>.</p><p>One protocol does not do every job. Web protocols handle requests and replies. Transport protocols carry application data. IP handles addressing and routing, while the local connection carries frames. Each part has a different responsibility.</p>"
      ],
      [
        "Four layers, four responsibilities",
        "<table><tr><th>DoD layer</th><th>Main responsibility</th><th>Examples</th></tr><tr><td>Application</td><td>Services used by applications</td><td>HTTP/HTTPS, DNS, DHCP, SMTP, FTP</td></tr><tr><td>Transport</td><td>Communication between application endpoints</td><td>TCP, UDP</td></tr><tr><td>Internet</td><td>Logical addressing and routing across networks</td><td>IPv4, IPv6</td></tr><tr><td>Network</td><td>Access to the local link and delivery of frames</td><td>Ethernet (802.3), Wi-Fi (802.11)</td></tr></table><p>The bottom layer is called <strong>Network</strong> in this DoD table. Other references call it network access or link. Be careful: the OSI model also has a layer called Network, but that layer corresponds broadly to the DoD Internet layer. Check which model the question uses.</p>"
      ],
      [
        "Protocols in a familiar journey",
        "<p>To open a website, your device may use DNS to look up addressing information for its name. It uses HTTP for web requests and replies. HTTPS protects HTTP traffic using TLS. DHCP can supply settings such as the device’s IP address.</p><p>Other applications use different protocols: SMTP transfers email and FTP transfers files. Basic FTP does not encrypt its traffic. TCP provides a reliable, ordered byte stream using acknowledgements and retransmission. UDP sends datagrams without those delivery guarantees, though an application can add its own handling. Neither protocol can guarantee that a service is always available.</p>"
      ],
      [
        "Encapsulation and diagnostic tools",
        "<p>Before data crosses a network, each layer adds information needed for its job. This is <strong>encapsulation</strong>. At the receiver, the layers read and remove that information. For a request using TCP, follow the sequence: application data → transport segment → IP packet → local frame.</p><div class=\"notice\">The SCSA support table lists PING among application tools and ARP at the Internet layer. Technically, ping is a utility using ICMP, and ARP maps IPv4 addresses to local hardware addresses. Use the course table for classification questions while understanding the mechanisms.</div><p>For course classification questions, use the SCSA support table: it lists PING among application tools and ARP at the Internet layer. Also understand what they do. <strong>ping</strong> is a utility using ICMP. <strong>ARP</strong> maps an IPv4 address to a local hardware address.</p><p>A successful ping means an ICMP echo reply arrived at that moment. It does not show that the website works. A failed ping does not by itself prove the endpoint is offline. Treat a test result as evidence for the next check, rather than a complete diagnosis.</p>"
      ]
    ],
    "practice": [
      [
        "Explain",
        "Why does a web browser need more than HTTP?",
        "HTTP describes web messages. Transport, IP and the local link perform other communication responsibilities."
      ],
      [
        "Apply",
        "A website name fails, but connecting to its known address works. Which service should you investigate first?",
        "DNS is a sensible first investigation because name resolution differs between the two tests. This is evidence to investigate, not proof of the cause."
      ]
    ],
    "task": "Draw the four-layer DoD stack. Follow a request to a school website through the layers. For each layer, name a suitable protocol and explain the job it does.",
    "solution": "Application: HTTPS carries a protected web request. Transport: TCP transfers the stream in order. Internet: IP addresses and routes packets. Network: Ethernet or Wi-Fi delivers frames across the local link. Responses travel through corresponding layers in reverse.",
    "recap": "The Internet layer supports IP addressing and routing; the network access layer handles the local link.",
    "lessons": [
      "Retrieve: identify resources shared on a school network; introduce protocols.",
      "Model: build and annotate the four-layer stack.",
      "Trace: explain a web request and compare TCP with UDP.",
      "Apply: diagnose short scenarios, then complete an exit explanation."
    ],
    "reference": "https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0003/1090875/Year-11_12_Computer-Science_ATAR_Additional-syllabus-support-booklet-.PDF",
    "refTitle": "SCSA additional syllabus support booklet",
    "quiz": {
      "q": "Which layer is responsible for routing IP packets?",
      "options": [
        "Application",
        "Transport",
        "Internet",
        "Network access"
      ],
      "answer": 2,
      "explanation": "The Internet layer supports IP addressing and routing; the network access layer handles the local link."
    }
  },
  {
    "id": "addressing",
    "week": 12,
    "title": "Addresses, devices and media",
    "intro": "Decide whether a message stays on the local network or needs a router. Then choose addresses, devices and connections that fit the setting.",
    "badge": "NETWORKS",
    "objectives": [
      "Explain an IP address and the role of an IPv4 subnet mask.",
      "Distinguish IPv4 and IPv6.",
      "Explain the functions of common network devices and media."
    ],
    "sections": [
      [
        "Addresses and the local network",
        "<p>An <strong>IP address</strong> identifies a network interface, such as a device’s Wi-Fi connection. IPv4 addresses have 32 bits, usually written as four decimal groups from 0 to 255. IPv6 addresses have 128 bits and are usually written in hexadecimal groups. IPv6 has a much larger address space.</p><p>An IPv4 <strong>subnet mask</strong> tells you which bits identify the network. With mask <code>255.255.255.0</code>, also written <code>/24</code>, address <code>192.168.10.24</code> belongs to network <code>192.168.10.0</code>. Under this mask, <code>192.168.10.80</code> is local and <code>192.168.11.80</code> is on another network. Use the mask to compare them; you cannot always just compare the first three groups.</p><p>A device normally sends traffic for another network through its configured <strong>gateway</strong>. These examples use private addresses from <code>192.168.0.0/16</code>. They are not globally routed on the public Internet. Assign each interface on the same network a unique IP address.</p>"
      ],
      [
        "Choose a device for its function",
        "<table><tr><th>Device</th><th>Function in this course model</th></tr><tr><td>Switch</td><td>Forwards frames within a LAN using hardware addresses</td></tr><tr><td>Router</td><td>Forwards IP packets between networks</td></tr><tr><td>Wireless access point</td><td>Connects wireless clients to a network</td></tr><tr><td>Modem</td><td>Adapts signals for the provider connection technology</td></tr><tr><td>Firewall</td><td>Permits or blocks traffic according to rules</td></tr></table><p>One physical device can do several jobs. A home gateway may include a router, switch, wireless access point and firewall. In this course model, a basic switch handles the local link, a router handles IP forwarding, and media belong to network access. Firewalls may inspect different layers, depending on their design.</p>"
      ],
      [
        "Choose a medium for the setting",
        "<p>Choose the connection to fit the location and the task:</p><ul><li><strong>UTP copper:</strong> often suitable for nearby wired devices. Check the cable and equipment’s distance and interference limits.</li><li><strong>Fibre:</strong> carries light, resists electromagnetic interference and can support longer, high-capacity links.</li><li><strong>Wireless:</strong> lets users move around, but devices share radio capacity. Walls, interference and access-point placement affect performance.</li></ul><p>Compare distance, installation, reliability, mobility and capacity. A faster connection in one part of the route will not fix every possible slowdown elsewhere.</p>"
      ]
    ],
    "practice": [
      [
        "Trace",
        "Are 192.168.20.10 and 192.168.21.10 local to each other under 255.255.255.0?",
        "No. Their network addresses are 192.168.20.0 and 192.168.21.0. Traffic between these networks needs routing."
      ],
      [
        "Choose",
        "What connects wireless laptops to a wired school LAN?",
        "A wireless access point provides that connection. A router is needed when traffic must cross between IP networks."
      ]
    ],
    "task": "Plan addresses for three classroom computers and a gateway on the same private /24 network. Give each interface a unique address. State the mask and network address, then give an address on a different network. Choose connections for classroom desks and a link between buildings.",
    "solution": "Example: PCs 192.168.30.10, .11 and .12; gateway 192.168.30.1; mask 255.255.255.0; network 192.168.30.0. 192.168.31.10 is on a different /24 network. UTP may suit fixed desks. Fibre may suit the building link because distance and electromagnetic interference matter. Confirm actual distance and equipment requirements before a real installation.",
    "recap": "A subnet mask identifies the network portion; compare network addresses to decide whether a destination is local.",
    "lessons": [
      "Retrieve: layer functions; interpret IPv4 and IPv6 examples.",
      "Model: network portion and /24 local-versus-remote comparisons.",
      "Investigate: match device functions to traffic paths.",
      "Apply: produce an addressing table and justify media choices."
    ],
    "reference": "https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0003/1090875/Year-11_12_Computer-Science_ATAR_Additional-syllabus-support-booklet-.PDF",
    "refTitle": "SCSA additional syllabus support booklet",
    "quiz": {
      "q": "What does an IPv4 subnet mask identify?",
      "options": [
        "The network portion of an address",
        "The website name",
        "The maximum Wi-Fi speed"
      ],
      "answer": 0,
      "explanation": "A subnet mask identifies the network portion; compare network addresses to decide whether a destination is local."
    }
  },
  {
    "id": "network-design",
    "week": 13,
    "title": "Designing and protecting a network",
    "intro": "Design a network for a school scenario. Show how it connects, who can use each resource, and what might limit its performance.",
    "badge": "NETWORKS",
    "objectives": [
      "Distinguish LAN, WLAN and WAN.",
      "Produce and explain a logical network diagram.",
      "Explain security controls and network performance factors."
    ],
    "sections": [
      [
        "Scale and logical diagrams",
        "<p>A school site may use a <strong>LAN</strong>, a local area network. Its wireless part is a <strong>WLAN</strong>. A <strong>WAN</strong> connects networks over a larger geographic area. Wireless describes the connection method, not how far the network reaches.</p><p>Draw a <strong>logical diagram</strong> to show how devices connect and how communication is organised. For course diagrams, use the Cisco-style symbols in the SCSA support booklet. Label devices, links and any required IP addresses and masks. A text chain such as Internet → modem → firewall → router → switch → clients helps you plan, but does not replace those symbols.</p><p>Follow the course convention: place the firewall outside the trusted network and do not give it an IP label in the assessment diagram. Real firewall designs vary. This drawing convention is not a rule about how all real firewalls are addressed.</p><div class=\"notice\">SCSA diagram convention: place the firewall outside the trusted network and do not assign it an IP address in the assessment diagram. Real firewall deployments vary. Consult the official support booklet for the expected symbol layout.</div>"
      ],
      [
        "Protect against unauthorised access",
        "<p>Start with what a user needs to do. A student may need to read a learning resource but should not need to change administrative files. Give the account only the access needed for its role. This is <strong>least privilege</strong>.</p><p>Use several controls together:</p><ul><li>Use firewall rules to permit or block network traffic.</li><li>Keep operating systems updated and use suitable sign-in methods and account permissions.</li><li>Separate guest devices from school administrative resources.</li><li>Protect wireless access with appropriate authentication and encryption.</li><li>Lock devices and protect credentials.</li></ul><p>For each control, explain which threat it reduces. A permitted connection is not automatically safe.</p>"
      ],
      [
        "Find the bottleneck",
        "<p>If many users report slow downloads, first find the part limiting the transfer. This is the <strong>bottleneck</strong>. It might be an Internet link, a busy server or shared wireless airtime. <strong>Bandwidth</strong> is capacity; <strong>throughput</strong> is the transfer rate you actually achieve. <strong>Latency</strong> is delay. More capacity does not automatically remove delay.</p><p>Devices transmitting at the same time on a shared medium can cause collisions. Modern switched full-duplex Ethernet avoids the collisions of older shared half-duplex Ethernet. Wi-Fi shares radio airtime and uses collision-avoidance mechanisms.</p><p>A broadcast uses resources across its broadcast domain. Basic switching does not remove broadcasts; routers ordinarily separate broadcast domains. Before changing a design, check link use, client numbers, signal quality, service load and traffic patterns. Explain how your proposed change addresses the evidence.</p>"
      ]
    ],
    "practice": [
      [
        "Explain",
        "Does replacing a switch always make Internet downloads faster?",
        "No. The Internet connection, wireless airtime or remote service may be the bottleneck. Measure or identify the constraint before recommending equipment."
      ],
      [
        "Protect",
        "Why should students not share an administrator account?",
        "Shared administration gives unnecessary privileges and weakens accountability. Individual accounts with limited permissions reduce unauthorised changes."
      ]
    ],
    "task": "Plan a school lab with 20 wired computers, 10 wireless laptops, a file server and Internet access. Draw the logical network and make an addressing table. Explain two security controls and two choices intended to improve performance.",
    "solution": "Connect wired clients and the file server to a switch, and connect an access point for laptops. Include routing to the provider and a firewall in the course diagram outside the trusted network. Use a labelled /24 private network and unique addresses. Restrict server permissions and update operating systems. Use wired links for stationary devices and assess access-point placement and concurrent wireless demand. Justify choices against the stated requirements; several designs may be valid.",
    "recap": "A basic switch forwards local frames. Broadcasts remain within the broadcast domain, while routers connect and separate IP networks.",
    "lessons": [
      "Retrieve: addresses and devices; distinguish LAN/WLAN/WAN.",
      "Design: draft a labelled logical network using course symbols.",
      "Protect: map unauthorised-access threats to controls.",
      "Evaluate: identify bottlenecks and revise the design."
    ],
    "reference": "https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0003/1090875/Year-11_12_Computer-Science_ATAR_Additional-syllabus-support-booklet-.PDF",
    "refTitle": "SCSA additional syllabus support booklet",
    "quiz": {
      "q": "Which statement about a basic switch is correct?",
      "options": [
        "It removes all broadcasts",
        "It forwards local frames but broadcasts still use network resources",
        "It replaces every router"
      ],
      "answer": 1,
      "explanation": "A basic switch forwards local frames. Broadcasts remain within the broadcast domain, while routers connect and separate IP networks."
    }
  },
  {
    "id": "network-review",
    "week": 14,
    "title": "Network scenarios and review",
    "intro": "Use the network ideas together in a library scenario. Explain each choice, then compare your reasoning with the answers.",
    "badge": "NETWORKS",
    "objectives": [
      "Trace traffic across a designed network.",
      "Diagnose addressing and performance scenarios.",
      "Support design choices with evidence."
    ],
    "sections": [
      [
        "Use a repeatable explanation",
        "<p>Build your explanation in four parts:</p><ol><li>State what the user or system needs.</li><li>Name the relevant device or protocol.</li><li>Explain what it does.</li><li>Connect that action to the required outcome.</li></ol><p>For a remote destination, the client works out that the address is outside its local network. It sends traffic through its gateway, and the router forwards the packets towards the destination.</p>"
      ],
      [
        "Review task: the library upgrade",
        "<p>A library has 12 fixed desktops, 18 visiting wireless devices, a local file server and an Internet connection. Students must be able to read learning resources but not change staff files. A neighbouring building also needs access to the server. During busy periods, wireless transfers slow down.</p><ol><li>Produce a logical diagram with appropriate course symbols.</li><li>Allocate unique addresses on 192.168.40.0/24 and state the mask.</li><li>Trace a desktop’s request to the local server and to an external site.</li><li>Choose media for fixed desks and the building connection.</li><li>Explain two security controls and investigate the slowdown.</li></ol><p>Work through the design in stages:</p><ol><li>Draw a logical diagram using the course symbols.</li><li>Give devices unique addresses on <code>192.168.40.0/24</code> and state the mask.</li><li>Trace a desktop request to the local server, then to an external site.</li><li>Choose media for fixed desks and the link between buildings.</li><li>Explain two security controls and identify what you would check about the wireless slowdown.</li></ol><p>This is an original practice scenario. Compare your design with the explained answer and discuss any different choices.</p>"
      ]
    ],
    "practice": [
      [
        "Diagnose",
        "A client has 192.168.40.12/24 but its gateway is 192.168.41.1. What should you check?",
        "The configured gateway is outside the client’s /24 local network. Check the intended addressing plan and set the correct reachable local gateway. Do not change settings on a real school network without the administrator."
      ],
      [
        "Evaluate",
        "A learner says “ping works, so the website must work”. Explain the error.",
        "Ping tests ICMP responses, not the web application. DNS, HTTPS, service configuration or access rules may still prevent the page loading."
      ],
      [
        "Calculate",
        "In an idealised transfer, how long does 80 megabits take over a 20 megabit-per-second link?",
        "80 ÷ 20 = 4 seconds. This assumes the full rate is available and ignores overhead and delay. Megabits are not megabytes."
      ]
    ],
    "task": "Try the library scenario before opening the illustrative answer. Compare your choices and reasoning with it. Note your corrections, then explain one mistake and why your revised answer is better.",
    "solution": "Example addressing: gateway .1, server .2, desktops .10–.21, with a non-overlapping DHCP pool such as .100–.150 for clients; all on 192.168.40.0/24, mask 255.255.255.0. A switch supports wired links and an access point supports wireless clients. The router handles remote destinations. Use course symbols, placing the firewall outside the trusted network without an IP label. UTP may suit desks; fibre may suit the building link depending on distance. Apply file permissions and updated authenticated accounts. Investigate wireless airtime, placement, interference and utilisation before adding equipment. Local server traffic uses local delivery; external traffic uses the gateway.",
    "recap": "Identify the limiting link or service, then justify a change that addresses the evidence. A coherent design connects requirements, devices, security and performance.",
    "lessons": [
      "Retrieve: short mixed questions with explained feedback.",
      "Apply: complete the library design and traffic traces.",
      "Assess: teacher-selected theory questions under suitable conditions.",
      "Respond: correct misconceptions and plan week 15 recovery."
    ],
    "reference": "https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0003/1090875/Year-11_12_Computer-Science_ATAR_Additional-syllabus-support-booklet-.PDF",
    "refTitle": "SCSA additional syllabus support booklet",
    "quiz": {
      "q": "Which is the strongest recommendation for a reported slowdown?",
      "options": [
        "Buy the fastest router immediately",
        "Identify the limiting link or service, then justify a targeted change",
        "Remove all authentication"
      ],
      "answer": 1,
      "explanation": "Identify the limiting link or service, then justify a change that addresses the evidence. A coherent design connects requirements, devices, security and performance."
    }
  }
]);
