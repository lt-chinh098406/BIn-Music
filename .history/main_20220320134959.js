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
      name: "Yêu em qua từng dòng tin nhắn",
      singer: "Nger ft. nân",
      path: "./assets/music/Yêu em qua dòng tin nhắn(iêu iem qua dòng tin nhắn) - Ngơ ft. Nân [Lyrics Video].mp3",
      image: "./assets/img/1.jpg",
    },
    {
      name: "ÔNG TRỜI LÀM TỘI ANH CHƯA",
      singer: "MINH HANH x RASTZ x QNT ft. TUẤN CRY",
      path: "./assets/music/ÔNG TRỜI LÀM TỘI ANH CHƯA - MINH HANH x RASTZ x QNT ft. TUẤN CRY.mp3",
      image: "./assets/img/3.jpg",
    },
    {
      name: "'bao tiền một mớ bình yên?'",
      singer: "14 Casper & Bon",
      path: "./assets/music/'bao tiền một mớ bình yên-' - 14 Casper & Bon (Official).mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Chìm Sâu",
      singer: "MCK ft Trung Trần",
      path: "./assets/music/Chìm Sâu - RPT MCK (feat. Trung Trần) - Official Lyrics Video.mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Dịu Dàng Em Đến",
      singer: "Erik",
      path: "./assets/music/Dịu Dàng Em Đến - ERIK x Ryan「Lo - Fi Version by 1 9 6 7」- Official Music Video.mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Dù Cho Mai Về Sau",
      singer: "buitruonglinh",
      path: "./assets/music/Dù Cho Mai Về Sau (Acoustic Version) - buitruonglinh.mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Không Tên",
      singer: "MCK",
      path: "./assets/music/Không Tên -- MCK a.k.a Nger -- Official Lyrics Video.mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Mình Anh Nơi Này",
      singer: "Rum, Nit",
      path: "./assets/music/Mình Anh Nơi Này (Lofi Ver.) - Nit x Sing x Freak D.mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Một mình ta",
      singer: "buitruonglinh",
      path: "./assets/music/Một Mình Ta - buitruonglinh - Lyrics Video -.mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Ngày Đầu Tiên",
      singer: "Đức Phúc",
      path: "./assets/music/Ngày Đầu Tiên (Lofi Ver.) - Đức Phúc x Freak D.mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Dại",
      singer: "buitruonglinh",
      path: "./assets/music/Dại- buitruonglinh ft Tuyên (Lyrics).mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Giá như em nhìn lại",
      singer: "Cover",
      path: "./assets/music/GIÁ NHƯ EM NHÌN LẠI - JSOL x VIRUSS - Cover- Chương Chu.mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Đường tôi chở em về",
      singer: "buitruonglinh",
      path: "./assets/music/LIVE OUTDOOR - buitruonglinh live - Đường Tôi Chở Em Về - #4.mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Cho tôi lang thang",
      singer: "Đen ft Ngọt",
      path: "./assets/music/Ngọt vc. Đen - Cho Tôi Lang Thang.mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "cafe thuốc lá và những ngày mưa",
      singer: "Thế Bảo",
      path: "./assets/music/Thế Bảo - Cafe, Thuốc Lá & Những Ngày Vui (Official Lyric Video).mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "TRƯỚC KHI TUỔI TRẺ NÀY ĐÓNG LỐI",
      singer: "14 Casper & Bon",
      path: "./assets/music/TRƯỚC KHI TUỔI TRẺ NÀY ĐÓNG LỐI - Ngắn x Xám x Dick - -Đà Lạt- Ep3 ( Directed by Nguyễn Nhật Trung ).mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Vương",
      singer: "MCK",
      path: "./assets/music/Và nếu nắng gió có cuốn em đi, như là lời hứa... - Vương - MCK a.k.a Nger「 Lyric video 」.mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Có hẹn với thanh xuân",
      singer: "Monstar",
      path: "./assets/music/Có Hẹn Với Thanh Xuân - Monstar x Ryan「Lo - Fi Ver. by 1 9 6 7」- Audio Lyrics.mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Đau nhất là lặng im",
      singer: "Erik",
      path: "./assets/music/Đau Nhất Là Lặng Im - Erik x Zeaplee「Lofi Version by 1 9 6 7」- Audio Lyrics Video.mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Hai Triệu Năm",
      singer: "Đen",
      path: "./assets/music/Đen - hai triệu năm ft. Biên (m-v).mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Một triêu like",
      singer: "Đen",
      path: "./assets/music/Đen - một triệu like ft. Thành Đồng (M-V).mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Một triêu like",
      singer: "Đen",
      path: "./assets/music/Đen - một triệu like ft. Thành Đồng (M-V).mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Một triêu like",
      singer: "Đen",
      path: "./assets/music/Đen - một triệu like ft. Thành Đồng (M-V).mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Một triêu like",
      singer: "Đen",
      path: "./assets/music/Đen - một triệu like ft. Thành Đồng (M-V).mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Một triêu like",
      singer: "Đen",
      path: "./assets/music/Đen - một triệu like ft. Thành Đồng (M-V).mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Một triêu like",
      singer: "Đen",
      path: "./assets/music/Đen - một triệu like ft. Thành Đồng (M-V).mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Một triêu like",
      singer: "Đen",
      path: "./assets/music/Đen - một triệu like ft. Thành Đồng (M-V).mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Một triêu like",
      singer: "Đen",
      path: "./assets/music/Đen - một triệu like ft. Thành Đồng (M-V).mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Một triêu like",
      singer: "Đen",
      path: "./assets/music/Đen - một triệu like ft. Thành Đồng (M-V).mp3",
      image: "./assets/img/5.jpg",
    },
    {
      name: "Một triêu like",
      singer: "Đen",
      path: "./assets/music/Đen - một triệu like ft. Thành Đồng (M-V).mp3",
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
