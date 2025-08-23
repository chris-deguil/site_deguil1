-- assets/macros_logo.lua
-- Associe les commandes \logo... à un <span class="fav_xxx"></span>
-- Les images sont maintenant dans assets/image/ et gérées par snt.scss

function RawInline(el)
  if el.format == "tex" then
    local logos = {
      ["\\logoAnalyser"]        = "fav_analyser",
      ["\\logoAutonomie"]       = "fav_autonomie",
      ["\\logoBinome"]          = "fav_binome",
      ["\\logoCerveau"]         = "fav_cerveau",
      ["\\logoCle"]             = "fav_cle",
      ["\\logoComprehension"]   = "fav_comprehension",
      ["\\logoDecouverte"]      = "fav_decouverte",
      ["\\logoGroupe"]          = "fav_groupe",
      ["\\logoInformation"]     = "fav_information",
      ["\\logoIdee"]            = "fav_idee",
      ["\\logoHistoire"]        = "fav_histoire",
      ["\\logoReinvestissement"]= "fav_reinvesitssement2",
      ["\\logoValidation"]      = "fav_validation",
      ["\\logoDocument"]        = "fav_document" -- si tu ajoutes un fichier fav_document.png
    }

    if logos[el.text] then
      return pandoc.RawInline("html",
        '<span class="' .. logos[el.text] .. '"></span>')
    end
  end
end
