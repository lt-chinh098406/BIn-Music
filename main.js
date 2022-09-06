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
      name: "Xuân Thì",
      singer: "HÀ ANH TUẤN",
      path: "./assets/music/(Lyric Video) - XUÂN THÌ - HÀ ANH TUẤN.mp3",
      image: "./assets/img/5.JPG",
    },
    {
      name: "Chân Ái",
      singer: "O Sen",
      path: "./assets/music/Chân Ái - O Sen - The Masked Singer Vietnam [Audio Lyrics].mp3",
      image: "./assets/img/5.JPG",
    },
    {
      name: "Lời Anh Chưa Thể Nói (Lofi Ver.)",
      singer: "Chubby",
      path: "./assets/music/Lời Anh Chưa Thể Nói (Lofi Ver.) - Chubby x Freak D.mp3",
      image: "./assets/img/5.JPG",
    },
    {
      name: "lời tạm biệt chưa nói",
      singer: "GREY D & ORANGE, Kai Đinh",
      path: "./assets/music/lời tạm biệt chưa nói - GREY D & ORANGE, Kai Đinh - ‘Hương Mùa Hè’ show (tập 3).mp3",
      image: "./assets/img/5.JPG",
    },
    {
      name: "MẶT MỘC",
      singer: "Phạm Nguyên Ngọc x VAnh x Ân Nhi",
      path: "./assets/music/MẶT MỘC - Phạm Nguyên Ngọc x VAnh x Ân Nhi (Original).mp3",
      image: "./assets/img/5.JPG",
    },
    {
      name: "THICHTHICH",
      singer: "PHƯƠNG LY",
      path: "./assets/music/THICHTHICH - PHƯƠNG LY - OFFICIAL MV.mp3",
      image: "./assets/img/5.JPG",
    },
    {
      name: "Thời Gian Sẽ Trả Lời",
      singer: "Tiên Cookie feat. JustaTee & BigDaddy",
      path: "./assets/music/Thời Gian Sẽ Trả Lời (Freak D Lofi Ver.) - Tiên Cookie feat. JustaTee & BigDaddy.mp3",
      image: "./assets/img/5.JPG",
    },
    {
      name: "Tôi Chỉ Muốn Nói",
      singer: "Phan Mạnh Quỳnh",
      path: "./assets/music/Tôi Chỉ Muốn Nói - @Phan Mạnh Quỳnh Official live at #souloftheforest.mp3",
      image: "./assets/img/5.JPG",
    },
    {
      name: "Và Ngày Nào Đó",
      singer: " Bướm Mặt Trăng",
      path: "./assets/music/Và Ngày Nào Đó - Bướm Mặt Trăng - The Masked Singer Vietnam [Audio Lyrics].mp3",
      image: "./assets/img/5.JPG",
    },
    {
      name: "Xem Như Em Chẳng May",
      singer: "Kim Sa Ngư",
      path: "./assets/music/Xem Như Em Chẳng May - Kim Sa Ngư - The Masked Singer Vietnam [Audio Lyrics].mp3",
      image: "./assets/img/5.JPG",
    },
    {
      name: "Đau Ở Đây Này (Lofi Ver.)",
      singer: "Nal x Freak D",
      path: "./assets/music/Đau Ở Đây Này (Lofi Ver.) - Nal x Freak D.mp3",
      image: "./assets/img/5.JPG",
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
