/* globals omitTerms, respecConfig, $, require */
/* DID WG common Javascript ReSpec functions */
/*  ... stolen from Gregg Kellogg of the JSON-LD 1.1 Working Group */
/*  ... who stole it from Manu Sporny of the JSON-LD 1.0 Working Group */
/*  ... who stole it from Shane McCarron, that beautiful, beautiful man. */
/* exported restrictReferences */
var ccg = {
  // Add as the respecConfig localBiblio variable
  // Extend or override global respec references
  localBiblio: {
    "DID-SPEC-REGISTRIES": {
      title: "DID Specification Registries",
      href: "https://w3c.github.io/did-spec-registries/",
      authors: [
      	"Orie Steele",
        "Manu Sporny"
      ],
      status: "ED",
      publisher: "Decentralized Identifier Working Group"
    },
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
    "DID-USE-CASES": {
      title: "Decentralized Identifier Use Cases",
      href: "https://www.w3.org/TR/did-use-cases/",
      authors: [
      	"Joe Andrieu",
        "Kim Hamilton Duffy",
        "Ryan Grant",
        "Adrian Gropper"
      ],
      status: "ED",
      publisher: "Decentralized Identifier Working Group"
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
      date: "December 2019",
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
    }
  }
};

// We should be able to remove terms that are not actually
// referenced from the common definitions
//
// Add class "preserve" to a definition to ensure it is not removed.
//
// the termlist is in a block of class "termlist".
const termNames = [] ;
const termsReferencedByTerms = [] ;

function restrictReferences(utils, content, filename) {
  const base = document.createElement("div");
  base.innerHTML = content;

  return (base.innerHTML);
}

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

  // add a handler to come in after all the definitions are resolved
  //
  // New logic: If the reference is within a 'dl' element of
  // class 'termlist', and if the target of that reference is
  // also within a 'dl' element of class 'termlist', then
  // consider it an internal reference and ignore it.
  respecEvents.sub('end-all', (message) => {
    console.log("message", message);
    if (message === 'core/link-to-dfn') {
      // 1. build a list of all term-internal references
      // 2. When ready to process, for each reference INTO the terms,
      // remove any terms they reference from the termNames array too.
      const noPreserve =
        document.querySelectorAll("#terminology dfn:not(.preserve)");

      for (const item of noPreserve) {
        const $t = $(item);
        const titles = getDfnTitles(item);
        console.log('titles', titles);
        /*
        const $t = $(item);
        const titles = $t.getDfnTitles();
        const n = $t.makeID("dfn", titles[0]);
        if (n) {
          termNames[n] = $t.parent();
        }
        */
      }

      //const $container = $(".termlist", base) ;
      //const containerID = $container.makeID("", "terms") ;

      // all definitions are linked; find any internal references
      const internalTerms = document.querySelectorAll(".termlist a.internalDFN");
      for (const item of internalTerms) {
        const idref = item.getAttribute('href').replace(/^#/,"") ;
        if (termNames[idref]) {
          // this is a reference to another term
          // what is the idref of THIS term?
          const def = item.closest('dd');
          if (def) {
            const tid = def.previousElementSibling
              .querySelector('dfn')
              .getAttribute('id');
            if (tid) {
              if (termsReferencedByTerms[tid] === undefined) termsReferencedByTerms[tid] = [];
              termsReferencedByTerms[tid].push(idref);
            }
          }
        }
      }

      // clearRefs is recursive.  Walk down the tree of
      // references to ensure that all references are resolved.
      const clearRefs = (theTerm) => {
        if (termsReferencedByTerms[theTerm] ) {
          for (const item of termsReferencedByTerms[theTerm]) {
            if (termNames[item]) {
                delete termNames[item];
                clearRefs(item);
            }
          }
        };
        // make sure this term doesn't get removed
        if (termNames[theTerm]) {
          delete termNames[theTerm];
        }
      };

      // now termsReferencedByTerms has ALL terms that
      // reference other terms, and a list of the
      // terms that they reference
      const internalRefs = document.querySelectorAll("a[data-link-type='dfn']");
      for (const item of internalRefs) {
        const idref = item.getAttribute('href').replace(/^.*#/,"") ;
        // if the item is outside the term list
        if (!item.closest('dl.termlist')) {
          clearRefs(idref);
        }
      }

      // delete any terms that were not referenced.
      for (const term in termNames) {
        //console.log("DELETE TERM?", term);
        const $p = $("#"+term);
        // Remove term definitions inside a dt, where data-cite does not start with shortname
        if ($p === undefined) { continue; }
        if (!$p.parent().is("dt")) { continue; }
        if (($p.data("cite") || "").toLowerCase().startsWith(respecConfig.shortName)) { continue; }

        const $dt = $p.parent();
        const $dd = $dt.next();

        // If the associated dd contains a dfn which is _not_ in termNames, warn
        if ($dd.children("dfn").length > 0) {
          console.log(term + " definition contains definitions " + $dd.children("dfn").attr("id"))
        }
        console.log("drop term " + term);
        const tList = $p.getDfnTitles();
        $dd.remove(); // remove dd
        $dt.remove(); // remove dt
      }
    }
  });
});

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
