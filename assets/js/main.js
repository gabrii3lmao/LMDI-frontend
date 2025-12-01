async function request(url, method = "GET") {
  const res = await fetch(url, { method });

  if (!res.ok) {
    throw new Error(`Erro HTTP ${res.status}`);
  }

  return await res.text();
}

document.addEventListener("click", async (e) => {
  if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button === 1) {
    return;
  }

  const link = e.target.closest("a");

  if (!link) return;

  const href = link.getAttribute("href");
  const isExternal = link.origin !== location.origin;

  if (isExternal) return;
  if (href.startsWith("#")) return;

  e.preventDefault();
  carregarPagina(href);
});


async function carregarPagina(href) {
  try {
    const html = await request(href, "GET");
    carregaResultado(html);
  } catch (err) {
    console.error("Erro ao carregar página:", err);
  }
}



function carregaResultado(html) {
  const resultado = document.querySelector(".content");

  if (!resultado) {
    console.error("Elemento .content não encontrado!");
    return;
  }

  resultado.innerHTML = html;
}
