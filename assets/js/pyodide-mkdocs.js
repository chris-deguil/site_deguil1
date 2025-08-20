// assets/python/pyodide-mkdocs.js (version corrigée)
// Initialisation d'un bloc Pyodide stylé "MkDocs" pour Quarto.
// Hypothèse : le HTML contient #code, #out, #quota, et les boutons #run #check #download #reset #clear (#save optionnel).

window.addEventListener('DOMContentLoaded', () => {
  // 0) Récupération des éléments DOM
  const ta       = document.getElementById('code');
  const out      = document.getElementById('out');
  //  const quotaEl  = document.getElementById('quota'); // sert ce ompeur pour le nombre de tentatie

  const btnRun      = document.getElementById('run');
  const btnCheck    = document.getElementById('check');
  const btnDownload = document.getElementById('download');
  const btnReset    = document.getElementById('reset');
  const btnClear    = document.getElementById('clear');
  const btnSave     = document.getElementById('save'); // optionnel

  // 1) Éditeur (fallback si CodeMirror absent)
  let cm = null;
  if (window.CodeMirror && ta){
    cm = CodeMirror.fromTextArea(ta, { mode: "python", lineNumbers: true, indentUnit: 4, tabSize: 4, indentWithTabs: false });
  }
  const getCode = () => cm ? cm.getValue() : (ta ? ta.value : "");
  const setCode = (v) => cm ? cm.setValue(v) : (ta ? (ta.value = v) : null);

  // 2) Chargement Pyodide
  let pyodide = null;
  (async () => {
    try{
      pyodide = await loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/" });
      // activer boutons d'exécution
      if (btnRun)   btnRun.disabled = false;
      if (btnCheck) btnCheck.disabled = false;
    }catch(e){
      console.error("Pyodide load error:", e);
    }
  })();

  // 3) Utilitaires UI
  const setBusy = (b) => [btnRun, btnCheck, btnReset, btnDownload, btnClear, btnSave]
    .filter(Boolean).forEach(el => el.disabled = b);
  const printToOut = (text, ok=false) => {
    if (!out) return;
    const pre = out.querySelector('pre') || out;
    pre.textContent = text;
    if (pre.style) pre.style.color = ok ? "#065f46" : "#111827";
  };

  /*
  //fonction permettant de compter le nombre de tentative à chaque execution
  const decQuota = () => {
    if (!quotaEl) return 1;
    let q = parseInt(quotaEl.textContent,10);
    if (q>0){ q--; quotaEl.textContent = String(q); }
    return q;
  };*/

  // 4) Exécution Python
  async function runPython(code){
    if (!pyodide){ printToOut("Pyodide n'est pas encore prêt."); return; }
    setBusy(true); printToOut("… exécution en cours …");
    try{
pyodide.runPython(`
import sys, io
if not hasattr(sys, '_orig_stdout'):
    sys._orig_stdout = sys.stdout
    sys.stdout = io.StringIO()
`);
      await pyodide.runPythonAsync(code);
      const outText = pyodide.runPython("sys.stdout.getvalue()");
      printToOut(outText || "✓ Exécution terminée sans sortie.", true);
    }catch(err){
      printToOut(String(err));
    }finally{
      setBusy(false);
    }
  }

  // 5) Écouteurs des boutons
  //btnRun     && btnRun.addEventListener('click', async () => { if (decQuota()===0){ printToOut("Quota d'évaluations atteint."); return; } await runPython(getCode()); });
  //btnCheck   && btnCheck.addEventListener('click', async () => { if (decQuota()===0){ printToOut("Quota d'évaluations atteint."); return; } await runPython(getCode()); });
  btnRun.addEventListener('click', async () => { await runPython(getCode()); });
  btnCheck.addEventListener('click', async () => { await runPython(getCode()); });

  
  btnReset   && btnReset.addEventListener('click', () => {
    setCode(`def somme(a, b):
    return ...  # ← compléter ici

# tests
assert somme(10, 32) == 42
assert somme(100, 7) == 107`);
    printToOut("► Sortie du programme…");
  });
  btnClear   && btnClear.addEventListener('click', () => printToOut(""));
  btnDownload&& btnDownload.addEventListener('click', () => {
    const blob = new Blob([getCode()], { type: "text/x-python" });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = "exercice.py"; a.click(); URL.revokeObjectURL(a.href);
  });
  btnSave    && btnSave.addEventListener('click', () => {
    try{ localStorage.setItem("exo_pyodide_code", getCode()); printToOut("✔ Code sauvegardé localement.", true); }
    catch(e){ printToOut("Impossible de sauvegarder."); }
  });

  // 6) Raccourci clavier
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter'){
      e.preventDefault();
      if (btnRun && !btnRun.disabled) btnRun.click();
    }
  });
});