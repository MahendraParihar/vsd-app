DROP TABLE IF EXISTS txn_gallery_image;
DROP TABLE IF EXISTS txn_gallery;

-- ------------------------------------------ GALLERY ---------------------------------------------


CREATE TABLE IF NOT EXISTS txn_gallery (
  gallery_id  SERIAL       NOT NULL  PRIMARY KEY,
  table_id    INT          NOT NULL,
  pk_of_table INT          NOT NULL,
  title       VARCHAR(100) NULL,
  active      BOOLEAN      NOT NULL DEFAULT '1',
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by  INT          NOT NULL,
  updated_by INT          NOT NULL
);


CREATE TABLE IF NOT EXISTS txn_gallery_media (
  gallery_image_id SERIAL       NOT NULL  PRIMARY KEY,
  gallery_id       INT          NOT NULL,
  thumb_image_path VARCHAR(250) NOT NULL,
  media_src_id     INT          NOT NULL,
  media_path             VARCHAR(250) NOT NULL,
  CONSTRAINT mgi_txn_gallery_id_fk FOREIGN KEY (gallery_id) REFERENCES txn_gallery (gallery_id),
  CONSTRAINT mgi_txn_gallery_media_src_id_fk FOREIGN KEY (media_src_id) REFERENCES mst_media_src (media_src_id)
);

CREATE INDEX ix_gallery_image_gallery_id
  ON txn_gallery_media (gallery_id);
