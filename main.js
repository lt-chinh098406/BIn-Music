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
      name: "Mashup -Anh sẽ ổn thôi & Cao ốc 20",
      singer: "Phạm Nguyên Ngọc",
      path: "./assets/music/Phạm Nguyên Ngọc - Mashup -Anh sẽ ổn thôi & Cao ốc 20-.mp3",
      image: "./assets/img/5.JPG",
    },
    {
      name: "vaicaunoicokhiennguoithaydoi",
      singer: "GREY D x TLINH",
      path: "./assets/music/vaicaunoicokhiennguoithaydoi - GREY D x TLINH - Official Music Video.mp3",
      image: "./assets/img/5.JPG",
    },
    {
      name: "Làm gì có ai thương em mà lại băng qua màn sương đêm",
      singer: " Tóc Tiên x Touliver x $ONDAY",
      path: "./assets/music/-Làm gì có ai thương em mà lại băng qua màn sương đêm - - Tóc Tiên x Touliver x $ONDAY「Lyric Video」.mp3",
      image: "./assets/img/5.JPG",
    },
    {
      name: "'có ai ở đây không-'",
      singer: "14 Casper & Bon",
      path: "./assets/music/'có ai ở đây không-' (Acoustic Version) - 14 Casper & Bon.mp3",
      image: "./assets/img/5.JPG",
    },
    {
      name: "Đôi bước ngân nga, dưới ánh chiều tà",
      singer: "Southalid ft. Mal",
      path: "./assets/music/-Đôi bước ngân nga, dưới ánh chiều tà- Đại diện cho trái tim - Southalid ft. Mal - Speed up.mp3",
      image: "./assets/img/5.JPG",
    },
    {
      name: "Ca phê thuốc lá và những ngày vui",
      singer: "phạm nguyên ngọc",
      path: "./assets/music/Ca phê thuốc lá và những ngày vui--Thế bảo--phạm nguyên ngọc--Thuân mã.youtobe.mp3",
      image: "./assets/img/5.JPG",
    },
    {
      name: "Chuyện Đôi Ta",
      singer: "Emcee L ft Muộii",
      path: "./assets/music/Chuyện Đôi Ta (Freak D Lofi Ver.) - Emcee L ft Muộii.mp3",
      image: "./assets/img/5.JPG",
    },
    {
      name: "Chỉ Còn Ta Và Ta Giữa Trời",
      singer: "DBlue",
      path: "./assets/music/Chỉ Còn Ta Và Ta Giữa Trời.mp3",
      image: "./assets/img/5.JPG",
    },
    {
      name: "GHÉ QUA",
      singer: "Dick x PC x Tofu",
      path: "./assets/music/GHÉ QUA - OFFICIAL MV - Dick x PC x Tofu.mp3",
      image: "./assets/img/5.JPG",
    },
    {
      name: "Mẹ Yêu & Mẹ Tôi",
      singer: "Phạm Nguyên Ngọc",
      path: "./assets/music/Phạm Nguyên Ngọc - Mashup -Mẹ Yêu & Mẹ Tôi-.mp3",
      image: "./assets/img/5.JPG",
    },
    {
      name: "VÌ SAO",
      singer: "CHILLIES",
      path: "./assets/music/VÌ SAO - CHILLIES - OFFICIAL MUSIC VIDEO.mp3",
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
