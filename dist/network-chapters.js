chapters.push(...[
  {
    "id": "networks",
    "week": 11,
    "title": "Network foundations",
    "intro": "Follow a message from an application to a network connection. Layers divide communication into manageable responsibilities.",
    "badge": "NETWORKS",
    "objectives": [
      "Explain why communication protocols are needed.",
      "Describe the four layers of the DoD TCP/IP model.",
      "Match common protocols to their purpose."
    ],
    "sections": [
      [
        "A shared set of rules",
        "<p>A network connects devices so they can exchange data and share resources. A protocol defines rules such as message format and expected responses. Agreeing on these rules lets different implementations communicate.</p><p>When you request a web page, several protocols cooperate. A browser handles web messages; transport moves application data; IP supports addressing and routing; the local connection carries frames.</p>"
      ],
      [
        "Four layers, four responsibilities",
        "<table><tr><th>DoD layer</th><th>Main responsibility</th><th>Examples</th></tr><tr><td>Application</td><td>Services used by applications</td><td>HTTP/HTTPS, DNS, DHCP, SMTP, FTP</td></tr><tr><td>Transport</td><td>Communication between application endpoints</td><td>TCP, UDP</td></tr><tr><td>Internet</td><td>Logical addressing and routing across networks</td><td>IPv4, IPv6</td></tr><tr><td>Network</td><td>Access to the local link and delivery of frames</td><td>Ethernet (802.3), Wi-Fi (802.11)</td></tr></table><p>The network layer here is also called network access or link in other references. Do not confuse it with the OSI network layer, which corresponds broadly to the Internet layer.</p>"
      ],
      [
        "Protocols in a familiar journey",
        "<p>DNS resolves a name to addressing information. HTTP specifies web requests and responses; HTTPS protects HTTP using TLS. DHCP can supply network configuration automatically. SMTP transfers email; FTP transfers files, but basic FTP does not encrypt its traffic.</p><p>TCP provides a reliable, ordered byte stream using acknowledgements and retransmission. UDP sends datagrams without those delivery guarantees; an application can add its own handling. Neither protocol guarantees that a service will always be available.</p>"
      ],
      [
        "Encapsulation and diagnostic tools",
        "<p>As data moves down the stack, protocols add control information. The receiver interprets and removes that information as data moves up. Trace a browser request as application data → transport segment → IP packet → local frame.</p><div class=\"notice\">The SCSA support table lists PING among application tools and ARP at the Internet layer. Technically, ping is a utility using ICMP, and ARP maps IPv4 addresses to local hardware addresses. Use the course table for classification questions while understanding the mechanisms.</div><p>A successful ping shows that an ICMP echo reply was received from the responding endpoint at that moment. It does not prove that its web service works. A failed ping alone does not prove the endpoint is offline.</p>"
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
    "task": "Draw a four-layer stack and trace a request to a school website. Name one protocol at each layer and explain its contribution.",
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
    "intro": "Use addresses and a subnet mask to explain local delivery, then choose equipment for a connection.",
    "badge": "NETWORKS",
    "objectives": [
      "Explain an IP address and the role of an IPv4 subnet mask.",
      "Distinguish IPv4 and IPv6.",
      "Explain the functions of common network devices and media."
    ],
    "sections": [
      [
        "Addresses and the local network",
        "<p>An IP address identifies an interface for IP communication. IPv4 addresses contain 32 bits, commonly written as four decimal octets from 0 to 255. IPv6 uses 128 bits and is commonly written in hexadecimal groups. IPv6 provides a much larger address space; its format is different from IPv4.</p><p>An IPv4 subnet mask identifies the network portion of an address. For <code>192.168.10.24</code> with mask <code>255.255.255.0</code> (a /24 prefix), the network is <code>192.168.10.0</code>. Under this same /24 mask, <code>192.168.10.80</code> is local; <code>192.168.11.80</code> is on a different network. The comparison depends on the mask, not always the first three octets.</p><p>A device normally sends traffic for another network to a configured gateway. The examples use private addresses from 192.168.0.0/16. Private addresses are not globally routed on the public Internet. Two interfaces on the same network must not be assigned the same IP address.</p>"
      ],
      [
        "Choose a device for its function",
        "<table><tr><th>Device</th><th>Function in this course model</th></tr><tr><td>Switch</td><td>Forwards frames within a LAN using hardware addresses</td></tr><tr><td>Router</td><td>Forwards IP packets between networks</td></tr><tr><td>Wireless access point</td><td>Connects wireless clients to a network</td></tr><tr><td>Modem</td><td>Adapts signals for the provider connection technology</td></tr><tr><td>Firewall</td><td>Permits or blocks traffic according to rules</td></tr></table><p>Devices can combine functions: a home gateway may contain a router, switch, access point and firewall. A basic switch is associated with the local link, a router with the Internet layer, and media with network access. Firewalls can inspect different layers depending on their design.</p>"
      ],
      [
        "Choose a medium for the setting",
        "<p>UTP copper is widely used for nearby wired devices, with distance and interference limits depending on the cable and equipment. Fibre carries light, resists electromagnetic interference and can support longer high-capacity links. Wireless supports mobility but shares radio capacity and is affected by obstacles, interference and placement.</p><p>Compare installation, distance, reliability, mobility and capacity. A faster advertised medium cannot remove every bottleneck in a complete path.</p>"
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
    "task": "Assign unique private IPv4 addresses to three classroom computers and a gateway on a /24 network. State the mask, network address and one address on a different network. Choose media for classroom desks and a link between buildings.",
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
    "intro": "Connect a school scenario to a logical diagram, security controls and performance decisions.",
    "badge": "NETWORKS",
    "objectives": [
      "Distinguish LAN, WLAN and WAN.",
      "Produce and explain a logical network diagram.",
      "Explain security controls and network performance factors."
    ],
    "sections": [
      [
        "Scale and logical diagrams",
        "<p>A LAN serves a local area, such as a room or school site. A WLAN is a local network using wireless access. A WAN connects networks across a larger geographic area. Wireless does not automatically mean WAN.</p><p>A logical diagram shows devices, links and how communication is organised. Use the Cisco-style symbols and annotations illustrated in the SCSA support booklet for course diagrams. Label devices, connections, IP addresses where required, and subnet masks. A text chain such as Internet → modem → firewall → router → switch → clients is a planning aid, not a substitute for the required symbols.</p><div class=\"notice\">SCSA diagram convention: place the firewall outside the trusted network and do not assign it an IP address in the assessment diagram. Real firewall deployments vary. Consult the official support booklet for the expected symbol layout.</div>"
      ],
      [
        "Protect against unauthorised access",
        "<p>A firewall restricts network traffic using rules. Operating-system security includes updates, authentication and suitable account permissions. Use least privilege: give an account the access needed for its role. Lock devices and protect credentials. A permitted connection is not necessarily safe; controls work together.</p><p>For a classroom example, separate a guest network from school administrative resources, limit access to shared files by role, keep systems updated and protect wireless access with appropriate authentication and encryption. Explain the threat each control reduces.</p>"
      ],
      [
        "Find the bottleneck",
        "<p>Bandwidth describes a link’s capacity; observed throughput is the achieved transfer rate. A path can be limited by a link’s capacity or congestion, a server’s capacity, or a shared wireless channel. Latency is delay, and improving capacity does not necessarily remove delay.</p><p>Collisions can occur when devices transmit at the same time on a shared medium. Switched full-duplex Ethernet avoids the collisions associated with old shared half-duplex Ethernet. Wi-Fi shares radio airtime and uses collision-avoidance mechanisms. Broadcasts reach devices within the broadcast domain and consume resources; basic switching does not eliminate broadcasts. Routers ordinarily separate broadcast domains.</p><p>Improve a design by identifying evidence first: link utilisation, concurrent clients, signal quality, service load and traffic patterns. Explain which change addresses which constraint.</p>"
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
    "task": "Plan a school lab with 20 wired computers, 10 wireless laptops, a file server and Internet access. Include a logical diagram, an addressing table, two security controls and two performance decisions.",
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
    "intro": "Bring the layers, addresses and design decisions together. Explain your reasoning before checking the answers.",
    "badge": "NETWORKS",
    "objectives": [
      "Trace traffic across a designed network.",
      "Diagnose addressing and performance scenarios.",
      "Support design choices with evidence."
    ],
    "sections": [
      [
        "Use a repeatable explanation",
        "<p>Start with the requirement, identify the relevant device or protocol, explain its action, then connect the action to the outcome. For a remote destination: the client determines that it is outside the local network, sends via the gateway, and the router forwards packets toward that destination.</p>"
      ],
      [
        "Review task: the library upgrade",
        "<p>The library has 12 fixed desktops, 18 visiting wireless devices, a local file server and an Internet connection. Students may read learning resources but must not change staff files. The neighbouring building needs access to the server. During busy periods wireless transfers slow down.</p><ol><li>Produce a logical diagram with appropriate course symbols.</li><li>Allocate unique addresses on 192.168.40.0/24 and state the mask.</li><li>Trace a desktop’s request to the local server and to an external site.</li><li>Choose media for fixed desks and the building connection.</li><li>Explain two security controls and investigate the slowdown.</li></ol><p>This is an original practice scenario. Your teacher determines assessment conditions and marking.</p>"
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
    "task": "Complete the library scenario independently, then compare your reasoning with the illustrative answer. Mark corrections in a different colour and write one explanation of a mistake you corrected.",
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
