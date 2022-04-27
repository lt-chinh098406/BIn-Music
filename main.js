const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $(".player");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const cd = $(".cd");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");

const app = {
  currentIndex: 0,
  isPlaying: false,

  songs: [
    {
      name: "Head In The Clouds",
      singer: "Hayd",
      path: "./assets/music/Hayd - Head In The Clouds (LA Sessions).mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Try",
      singer: "Pink",
      path: "./assets/music/[Vietsub + Lyrics] Try - P!nk.mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Anh Thương em nhất mà",
      singer: "LÃ Long tib",
      path: "./assets/music/Anh Thương Em Nhất Mà- - Lã. x Log x TiB「Official Lyrics Video」 #Chang.mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "the Nights",
      singer: "Avicii",
      path: "./assets/music/Avicii - The Nights.mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Wake Me Up",
      singer: "Avicii",
      path: "./assets/music/Avicii - Wake Me Up (Official Video).mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "DayDreams",
      singer: "Soobin Hoàng Sơn x BigDaddy - Ki An Cover",
      path: "./assets/music/Daydreams (Freak D Lofi Ver.) - Soobin Hoàng Sơn x BigDaddy - Ki An Cover.mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Em Khác Gì Hoa (Lofi Ver.)",
      singer: "Lil Zpoet x Freak D",
      path: "./assets/music/Em Khác Gì Hoa (Lofi Ver.) - Lil Zpoet x Freak D.mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Lần Cuối",
      singer: "Thịnh Suy Cover",
      path: "./assets/music/Lần Cuối ‒ Thịnh Suy Cover ♫ MV Lyrics HD - Lời Bài Hát ♫.mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Lỡ Mai Này (Lofi Ver.)",
      singer: "Bozitt x Freak D",
      path: "./assets/music/Lỡ Mai Này (Lofi Ver.) - Bozitt x Freak D.mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Có em",
      singer: "Madihu ft LowG",
      path: "./assets/music/Madihu - Có em (Feat. Low G) [Official MV].mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Nợ Ai Đó Lời Xin lỗi 2 (Lofi Ver.)",
      singer: "Bozitt x Freak D",
      path: "./assets/music/Nợ Ai Đó Lời Xin lỗi 2 (Lofi Ver.) - Bozitt x Freak D.mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "ÔNG TRỜI LÀM TỘI ANH CHƯA",
      singer: "MINH HANH x RASTZ x QNT ft. TUẤN CRY",
      path: "./assets/music/ÔNG TRỜI LÀM TỘI ANH CHƯA - MINH HANH x RASTZ x QNT ft. TUẤN CRY.mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Location",
      singer: "THỊNH SUY",
      path: "./assets/music/THỊNH SUY live -Location - Khalid- - Live Session #8.mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Tình Ca Tình Ta",
      singer: "Ta-kis",
      path: "./assets/music/Tình Ca Tình Ta-kis(Lofi Chill)Lạc Vào Chốn Yên Bình Nắng Vương Vai.mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Unstoppable",
      singer: "Sia",
      path: "./assets/music/Unstoppable - Sia (Lyrics + Vietsub) ♫.mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Yêu Đơn Phương Là Gì",
      singer: "h0n x Bụi Chill",
      path: "./assets/music/Yêu Đơn Phương Là Gì, Là Ngốc Chẳng Dám Nói Ra - Yêu Đơn Phương Là Gì Lofi - h0n x Bụi Chill.mp3",
      image: "./assets/img/5.jpg",
    },
  ],

  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
        <div class="song ${
          index === this.currentIndex ? "active" : ""
        }" data-index="${index}">
          <div class="thumb" style="background-image: url('${song.image}')">
          </div>
          <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
          </div>
          <div class="option">
            <i class="fas fa-ellipsis-h"></i>
          </div>
        </div>
      `;
    });
    playlist.innerHTML = htmls.join("");
  },

  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },

  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;

    // Xử lý CD rotate
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 30000, // 10s
      iterations: Infinity,
    });
    cdThumbAnimate.pause();

    // Xử lý scroll cd
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0; // fix bug
      cd.style.opacity = newCdWidth / cdWidth; // opacity when scroll
    };

    // Xử lý play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    // Khi song được play
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    // Khi song bị pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    // khi tiến độ bài hát thay đổi
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    //seek
    progress.oninput = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    // Khi next/prev song
    nextBtn.onclick = function () {
      if (randomBtn.classList.contains("active")) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      // cdThumb.style.transform = 'rotate(0)'
      audio.play();
      _this.activeSong();
      _this.scrollToActiveSong();
    };
    prevBtn.onclick = function () {
      if (randomBtn.classList.contains("active")) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      // cdThumb.style.transform = 'rotate(0)'
      audio.play();
      _this.activeSong();
      _this.scrollToActiveSong();
    };

    // Random song
    randomBtn.onclick = function () {
      randomBtn.classList.toggle("active");
      repeatBtn.classList.remove("active");
    };

    // Repeat song
    repeatBtn.onclick = function () {
      repeatBtn.classList.toggle("active");
      randomBtn.classList.remove("active");
    };

    // Xử lý nextsong khi audio ended
    audio.onended = function () {
      if (repeatBtn.classList.contains("active")) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    // Lắng nghe click vào playlist
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");
      // if (songNode || e.target.closest('option')) {
      if (songNode && !e.target.closest("option")) {
        const newIndex = songNode.getAttribute("data-index");
        _this.currentIndex = newIndex;
        _this.loadCurrentSong();
        _this.activeSong();
        audio.play();
      }
      // }
    };
  },

  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },

  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },

  prevSong: function () {
    if (this.currentIndex != 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },

  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },

  activeSong: function () {
    var loopSongs = $$(".song");
    for (song of loopSongs) {
      song.classList.remove("active");
    }
    const activeSong = loopSongs[this.currentIndex];
    activeSong.classList.add("active");
  },

  scrollToActiveSong: function () {
    setTimeout(() => {
      if (this.currentIndex < 3) {
        $(".song.active").scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      } else {
        $(".song.active").scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }, 300);
  },

  start: function () {
    // Định nghĩa các thuộc tính cho Object
    this.defineProperties();

    // Lắng nghe / xử lý các event
    this.handleEvents();

    // tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    this.loadCurrentSong();

    // render playlist
    this.render();
  },
};

app.start();
