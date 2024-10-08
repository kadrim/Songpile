# Songpile

[![Windows Build](https://github.com/kadrim/Songpile/actions/workflows/windows.yml/badge.svg?event=push)](https://github.com/kadrim/Songpile/actions/workflows/windows.yml)
[![Linux Build](https://github.com/kadrim/Songpile/actions/workflows/ubuntu.yml/badge.svg?event=push)](https://github.com/kadrim/Songpile/actions/workflows/ubuntu.yml)
[![MacOS Build](https://github.com/kadrim/Songpile/actions/workflows/macos.yml/badge.svg?event=push)](https://github.com/kadrim/Songpile/actions/workflows/macos.yml)

Songpile - A tool to find and download your favourite music

## Installation

Download the Setup-File for your system from the [latest releases](https://github.com/kadrim/Songpile/releases/latest) and run it. The program itself has auto-updates enabled, so whenever a new version is released, it will be installed automatically.

## Compiling

At the time of writing, this package needs at least [nodejs](https://nodejs.org/) v16

To compile a binary for your currently running system, simply run these commands:

```bash
npm install
npm run electron:build
```

## Cookies

If Youtube blocks the download you need to Login to Youtube and extract all cookies for `.youtube.com` into a file called `cookies.json` with the following format:

```
[
    {
        "domain": ".youtube.com",
        "name": "xxx",
        "value": "xxx",
        "path": "/",
        "httpOnly": true,
        "expirationDate": 0,
        "hostOnly": false,
        "sameSite": "no_restriction",
        "secure": true
    }
]
```

## Disclaimer
THIS SOFTWARE IS PROVIDED "AS IS" AND ANY EXPRESSED OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE REGENTS OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
