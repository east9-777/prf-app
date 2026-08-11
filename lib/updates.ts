export interface VersionEntry {
  versao: string;
  data: string;
  novidades: string[];
}

export interface RemoteVersionInfo {
  versaoMaisRecente: string;
  linkApk: string;
  dataLancamento: string;
  novidades: string[];
  historico: VersionEntry[];
}

/**
 * URL do arquivo de versão. Hoje aponta pro link "raw" do versao.json
 * dentro do próprio repositório no GitHub. Toda vez que o conteúdo
 * desse arquivo mudar no repositório, o app passa a enxergar a versão
 * nova automaticamente — não precisa mudar essa URL de novo.
 */
export const REMOTE_VERSION_URL =
  "https://raw.githubusercontent.com/east9-777/prf-app/refs/heads/main/versao.json";

/**
 * Compara duas versões no formato "x.y.z".
 * Retorna > 0 se `a` for mais nova que `b`, < 0 se mais antiga, 0 se igual.
 */
export function compareVersions(a: string, b: string): number {
  const pa = a.split(".").map((n) => parseInt(n, 10) || 0);
  const pb = b.split(".").map((n) => parseInt(n, 10) || 0);
  const len = Math.max(pa.length, pb.length);
  for (let i = 0; i < len; i++) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

/**
 * Busca o arquivo de versão remoto. Retorna null em caso de falha
 * (sem internet, arquivo fora do ar, etc.) — nunca lança erro,
 * para que a checagem de atualização nunca quebre o app.
 */
export async function fetchRemoteVersionInfo(): Promise<RemoteVersionInfo | null> {
  try {
    const response = await fetch(REMOTE_VERSION_URL, {
      headers: { "Cache-Control": "no-cache" },
    });
    if (!response.ok) return null;
    const data = await response.json();
    if (!data?.versaoMaisRecente || !data?.linkApk) return null;
    return data as RemoteVersionInfo;
  } catch {
    return null;
  }
}
