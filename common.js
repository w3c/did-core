/* globals omitTerms, respecConfig, $, require */
/* DID WG common Javascript ReSpec functions */
/*  ... stolen from Gregg Kellogg of the JSON-LD 1.1 Working Group */
/*  ... who stole it from Manu Sporny of the JSON-LD 1.0 Working Group */
/*  ... who stole it from Shane McCarron, that beautiful, beautiful man. */
var ccg = {
  // Add as the respecConfig localBiblio variable
  // Extend or override global respec references
  localBiblio: {
    "REST": {
      title: "Architectural Styles and the Design of Network-based Software Architectures",
      date: "2000",
      href: "http://www.ics.uci.edu/~fielding/pubs/dissertation/",
      authors: [
        "Fielding, Roy Thomas"
      ],
      publisher: "University of California, Irvine."
    },
    "VC-USECASES": {
      title: "Verifiable Claims Use Cases",
      href: "https://www.w3.org/TR/verifiable-claims-use-cases/",
      authors: [
        "Shane McCarron",
        "Daniel Burnett",
        "Gregg Kellogg",
        "Brian Sletten",
        "Manu Sporny"
      ],
      status: "FPWD",
      publisher: "Verifiable Claims Working Group"
    },
    // aliases to known references
    "HTTP-SIGNATURES": {
      aliasOf: "http-signatures"
    },
    "MACAROONS": {
      title: 'Macaroons',
      // TODO: create spec
      href: 'http://macaroons.io/',
      authors: ['Arnar Birgisson', 'Joe Gibbs Politz', 'Úlfar Erlingsson',
        'Ankur Taly', 'Michael Vrable', 'Mark Lentczner'],
      status: 'unofficial',
      publisher: 'Credentials Community Group'
    },
    'OPEN-BADGES': {
      title: 'Open Badges',
      href: 'https://github.com/openbadges/openbadges-specification',
      authors: ['Brian Brennan', 'Mike Larsson', 'Chris McAvoy',
        'Nate Otto', 'Kerri Lemoie'],
      status:   'BA-DRAFT',
      publisher:  'Badge Alliance Standard Working Group'
    },
    'RDF-NORMALIZATION': {
      title: 'RDF Dataset Normalization',
      href: 'http://json-ld.github.io/normalization/spec/',
      authors: ['Dave Longley', 'Manu Sporny'],
      status:   'CG-DRAFT',
      publisher:  'Credentials W3C Community Group'
    },
    "LD-PROOFS": {
      title: "Linked Data Proofs",
      href: "https://w3c-dvcg.github.io/ld-proofs/",
      authors: [
        "Manu Sporny",
        "Dave Longley"
      ],
      status: "CG-DRAFT",
      publisher: "Digital Verification Community Group"
    },
    "LD-SIGNATURES": {
      title: "Linked Data Signatures",
      href: "https://w3c-dvcg.github.io/ld-signatures/",
      authors: [
        "Manu Sporny",
        "Dave Longley"
      ],
      status: "CG-DRAFT",
      publisher: "Digital Verification Community Group"
    },
    "MATRIX-URIS": {
      title: "Matrix URIs - Ideas about Web Architecture",
      date: "December 1996",
      href: "https://www.w3.org/DesignIssues/MatrixURIs.html",
      authors: [
        "Tim Berners-Lee"
      ],
      status: "Personal View"
    },
    "HASHLINK": {
      title: "Cryptographic Hyperlinks",
      date: "December 2018",
      href: "https://tools.ietf.org/html/draft-sporny-hashlink-05",
      authors: [
        "Manu Sporny"
      ],
      status: "Internet-Draft",
      publisher: "IETF"
    },
    "BASE58": {
      title: "The Base58 Encoding Scheme",
      date: "October 2020",
      href: "https://tools.ietf.org/html/draft-msporny-base58",
      authors: [
        "Manu Sporny"
      ],
      status: "Internet-Draft",
      publisher: "IETF"
    },
    "DNS-DID": {
      title: "The Decentralized Identifier (DID) in the DNS",
      date: "February 2019",
      href: "https://datatracker.ietf.org/doc/draft-mayrhofer-did-dns/",
      authors: [
        "Alexander Mayrhofer",
        "Dimitrij Klesev",
        "Markus Sabadello"
      ],
      status: "Internet-Draft"
    },
    "DID-RESOLUTION": {
      title: "Decentralized Identifier Resolution",
      href: "https://w3c-ccg.github.io/did-resolution/",
      authors: [
        "Markus Sabadello",
        "Dmitri Zagidulin"
      ],
      status: "Draft Community Group Report",
      publisher: "Credentials Community Group"
    },
    "DID-RUBRIC": {
      title: "Decentralized Characteristics Rubric v1.0",
      href: "https://w3c.github.io/did-rubric/",
      authors: [
        "Joe Andrieu"
      ],
      status: "Draft Community Group Report",
      publisher: "Credentials Community Group"
    },
    "PRIVACY-BY-DESIGN": {
      title: "Privacy by Design",
      href: "https://iapp.org/media/pdf/resource_center/pbd_implement_7found_principles.pdf",
      authors: [
        "Ann Cavoukian"
      ],
      date: "2011",
      publisher: "Information and Privacy Commissioner"
    },
    "MULTIBASE": {
      title: "The Multibase Encoding Scheme",
      date: "February 2021",
      href: "https://datatracker.ietf.org/doc/html/draft-multiformats-multibase-03",
      authors: [
        "Juan Benet",
        "Manu Sporny"
      ],
      status: "Internet-Draft",
      publisher: "IETF"
    }
  }
};


require(["core/pubsubhub"], (respecEvents) => {
  "use strict";

  console.log("RESPEC EVENTS", respecEvents);

  respecEvents.sub('end-all', (message) => {
    console.log("END EVENT", message);
    // remove data-cite on where the citation is to ourselves.
    const selfDfns = document.querySelectorAll("dfn[data-cite^='" + respecConfig.shortName.toUpperCase() + "#']");
    for (const dfn of selfDfns) {
      delete dfn.dataset.cite;
    }

    // Update data-cite references to ourselves.
    const selfRefs = document.querySelectorAll("a[data-cite^='" + respecConfig.shortName.toUpperCase() + "#']");
    for (const anchor of selfRefs) {
      anchor.href= anchor.dataset.cite.replace(/^.*#/,"#");
      delete anchor.dataset.cite;
    }

  });

});

// Removes dfns that aren't referenced anywhere in the spec.
// To ensure a definition appears in the Terminology section, use
//  and link to it!
// This is triggered by postProcess in the respec config.
function restrictRefs(config, document){

  // Get set of ids internal dfns referenced in the spec body
  const internalDfnLinks = document.querySelectorAll("a.internalDFN");
  let internalDfnIds = new Set();
  for (const dfnLink of internalDfnLinks) {
    const dfnHref = dfnLink.href.split("#")[1];
    internalDfnIds.add(dfnHref);
  }

  // Remove unused dfns from the termlist
  const termlist = document.querySelector(".termlist");
  const linkIdsInDfns = [];
  for (const child of termlist.querySelectorAll("dfn")){
    if (!internalDfnIds.has(child.id)){
      let dt = child.closest("dt");
      let dd = dt.nextElementSibling;

      // Get internal links from dfns we're going to remove
      //  because these show up in the dfn-panels later and then
      //  trigger the local-refs-exist linter (see below)
      const linksInDfn = dd.querySelectorAll("a.internalDFN");
      for (link of linksInDfn) {
        linkIdsInDfns.push(link.id);
      }

      termlist.removeChild(dt);
      termlist.removeChild(dd);
    }
  }

  // Remove unused dfns from the dfn-panels
  //  (these are hidden, but still trigger the local-refs-exist linter)
  //  (this seems like a hack, there's probably a better way to hook into respec
  //   before it gets to this point)
  const dfnPanels = document.querySelectorAll(".dfn-panel");
  for (const panel of dfnPanels) {
    if (!internalDfnIds.has(panel.querySelector(".self-link").href.split("#")[1])){
      panel.parentNode.removeChild(panel);
    }

    // Remove references to dfns we removed which link to other dfns
    const panelLinks = panel.querySelectorAll("li a");
    for (const link of panelLinks) {
      if (linkIdsInDfns.includes(link.href.split("#")[1])) {
        link.parentNode.removeChild(link);
      }
    }
  }

}

function _esc(s) {
  return s.replace(/&/g,'&amp;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/</g,'&lt;');
}

function reindent(text) {
  // TODO: use trimEnd when Edge supports it
  const lines = text.trimRight().split("\n");
  while (lines.length && !lines[0].trim()) {
    lines.shift();
  }
  const indents = lines.filter(s => s.trim()).map(s => s.search(/[^\s]/));
  const leastIndent = Math.min(...indents);
  return lines.map(s => s.slice(leastIndent)).join("\n");
}

function updateExample(doc, content) {
  // perform transformations to make it render and prettier
  return _esc(reindent(unComment(doc, content)));
}

function unComment(doc, content) {
  // perform transformations to make it render and prettier
  return content
    .replace(/<!--/, '')
    .replace(/-->/, '')
    .replace(/< !\s*-\s*-/g, '<!--')
    .replace(/-\s*- >/g, '-->')
    .replace(/-\s*-\s*&gt;/g, '--&gt;');
}
