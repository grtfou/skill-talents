"""啟動僅供本機使用的學習天賦樹；不需要安裝第三方套件。"""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from functools import partial
from pathlib import Path
import argparse
import webbrowser

ROOT = Path(__file__).resolve().parent / "app"


class LocalHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # 本機檔案更新後立即生效，避免舊課程或舊介面被快取。
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


def main():
    parser = argparse.ArgumentParser(description="開啟學習天賦樹")
    parser.add_argument("--port", type=int, default=4173)
    parser.add_argument("--no-browser", action="store_true")
    args = parser.parse_args()
    handler = partial(LocalHandler, directory=str(ROOT))
    try:
        server = ThreadingHTTPServer(("127.0.0.1", args.port), handler)
    except OSError as error:
        print(f"無法啟動本機伺服器：{error}")
        print(f"請確認連接埠 {args.port} 未被其他程式占用，且允許程式連接本機網路。")
        raise SystemExit(1)
    url = f"http://127.0.0.1:{args.port}"
    print(f"學習天賦樹已啟動：{url}\n請保留此視窗；按 Ctrl+C 結束。", flush=True)
    if not args.no_browser:
        webbrowser.open(url)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n已關閉學習天賦樹。")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
